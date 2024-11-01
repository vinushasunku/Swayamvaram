import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
//import { Tooltip } from 'react-native-paper';
import { GetStyle } from '../styles/style-sheet';
import SafeAreaView from 'react-native-safe-area-view';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getsortList,
  getMoreMatchesList,
  fetchMatcheslists,
  setselectedProfileId,
  fetchProfiledetail,
  setPreferenceVisiable,
} from '../redux/slices/matches';
import { SearchBar } from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';
import MatchesService from '../services/MatchesService';
import Colors from '../styles/colors';
import { setEditProfileDetail } from '../redux/slices/login';
import SavePreference from './SavePreference';
import { matchesStatusResult, shortListButton } from '../utils/actionfunctions';
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
};

const MatchesScreen = ({ navigation }: WizardProps) => {
  const sortMatchData: any = useAppSelector(getsortList);
  //const getMatchList: any = useAppSelector(getMatchesList);
  const getMatchList = useAppSelector(state => state.matches.matchesData);
  const getPagetokenInfo = useAppSelector(
    state => state.matches.matchesPageInfo,
  );
  const getMoreMatchList: any = useAppSelector(getMoreMatchesList);
  const [data, setData] = useState([] as any);
  const [loadingMore, setLoadingMore] = useState(false);
  const [doneLoading, setStatusLoading] = useState(false);
  const [searchtext, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState([]);
  const [masterDataSource, setMasterDataSource] = React.useState([]);
  const [pagetoken, setPreviousPagetoken] = React.useState(1);
  const loginprofileDetail = useAppSelector(state => state.loginId.profileData);
  const showPreference = useAppSelector(state => state.matches.preferenceShow);
  //const accountId = useAppSelector(state => state.registration.accountId);
  //const [selectProfileDetail, setselectProfileDetail] = React.useState<profileDto|null>(null);
  const [pageLoading, setPageLoading] = React.useState(true);
  const dispatch: any = useAppDispatch();
  const isFocused = useIsFocused();
  const [shortlistedProfileId, setShortlistedProfile] = React.useState([]);


  let stopFetchMore = true;
  const searchFilterFunction = (text: any) => {
    if (text) {
      //setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  useEffect(() => {
    fetchData();
    dispatch(setEditProfileDetail(false));
  }, [doneLoading]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            dispatch(setPreferenceVisiable(true));
          }}>
          <Icons name="filter" size={24} color={Colors.FrenchRose} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const fetchData = async () => {
    if (loginprofileDetail.id) {
      getPagetokenInfo.accountId = loginprofileDetail.id;
      getPagetokenInfo.pageToke = pagetoken;
      dispatch(fetchMatcheslists(getPagetokenInfo))
        .unwrap()
        .then(() => {
          console.log('fetchdata', getMatchList)
          setData(getMatchList);
          setStatusLoading(true);
        })
        .catch((error: any) => {
          console.log('get matches list', error);
        });
    }
    //setData(getMatchList);
  };

  // useEffect(()=>{
  //   setPageLoading(false)
  // },[selectProfileDetail])
  const handleOnEndReached = async () => {
    console.log('loadmore', stopFetchMore);
    setLoadingMore(true);
    if (!stopFetchMore) {
      getPagetokenInfo.accountId = loginprofileDetail.id;
      getPagetokenInfo.pageToke = pagetoken + 1;
      dispatch(fetchMatcheslists(getPagetokenInfo))
        .unwrap()
        .then(() => {
          //setData(getMatchList);
          setData([...data, getMatchList]);
          setStatusLoading(true);
        })
        .catch((error: any) => {
          console.log('get matches list', error);
        });
      stopFetchMore = true;
    }
    setLoadingMore(false);
  };
  function selectProfile(id: any) {
    const selectProfileId = {
      accountId: loginprofileDetail.id,
      selectedProfileId: id,
    };
    dispatch(setEditProfileDetail(false));
    dispatch(setselectedProfileId(selectProfileId));
    dispatch(fetchProfiledetail(selectProfileId))
      .unwrap()
      .then(async (response: any) => {
        if (await matchesStatusResult(selectProfileId)) {
          navigation.navigate('ProfileDetail');
        }

      })
      .catch((error: any) => {
        console.log('get matches list', error);
      });
  }
  function sendButton(id: any) {
    console.log('Send');
    MatchesService.sendProposal(loginprofileDetail.id, id)
      .then((response: any) => {
        console.log('success send');
      })
      .catch((error: any) => {
        console.log('error:', error);
      });
  }
  function rejectButton(id: any) {
    console.log('Send');
    MatchesService.rejectProposal(loginprofileDetail.id, id)
      .then((response: any) => {
        console.log('success send');
      })
      .catch((error: any) => {
        console.log('error:', error);
      });
  }
  async function shortListProfile(id: any) {
    await shortListButton(loginprofileDetail.id, id)
  }
  function matcheProfile() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ marginBottom: 10, borderRadius: 10, overflow: 'hidden' }}>
          {item.accountId != '' ? (
            <TouchableOpacity
              onPress={() => {
                selectProfile(item.accountId);
              }}>
              <ImageBackground
                style={{
                  width: '100%',
                  aspectRatio: 1.6,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderTopEndRadius: 5,
                }}
                resizeMode="cover"
                source={{
                  uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg',
                }}></ImageBackground>
              <View
                style={{
                  top: -20,
                  height: 150,
                  width: '90%',
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: '#aaa',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  paddingLeft: 20,
                  paddingTop: 20
                }}>
                <View style={{ flexDirection: 'row', marginRight:10 }}>
                  <View style={{ width: '80%' }}>
                    <Text
                      style={[
                        styles.mediumHeaderText
                      ]}>
                      {item.firstName + ' ' + item.lastName}
                    </Text>
                    <Text
                      style={[
                        styles.mediumHeaderText
                      ]}>
                      {item.age + ' ' + 'Yrs'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 , flexDirection:'row-reverse'}}>
                    <TouchableOpacity onPress={()=>{shortListProfile(item.accountId)}}>
                      <Icon
                        testID='iconBack'
                        name="star-outline"
                        color={Colors.FrenchRose}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                </View>



                <View style={[{
                  flexDirection: 'row', flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }]}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={[
                        styles.submitButton,
                        {
                          // width:'45%',
                          marginRight: 10
                        },
                      ]}
                      onPress={() => {
                        sendButton(item.accountId);
                      }}>
                      <Text style={[styles.buttonText]}>{'Send'}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={[
                        styles.submitButton, { marginRight: 10 }
                      ]}
                      onPress={() => {
                        rejectButton(item.accountId);
                      }}>
                      <Text style={[styles.buttonText]}>{'Not Intrested'}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      );
    };
    return (
      <FlatList
        data={data}
        keyExtractor={item => `${item.accountId + pagetoken}`}
        renderItem={renderItem}
        //onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => {
          stopFetchMore = false;
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 * 2.0 }}
      />
    );
  }
  function search() {
    return (
      <View style={styles.searchView}>
        <View style={{ flex: 1 }}>
          <SearchBar
            round
            inputContainerStyle={styles.inputSearchContainer}
            containerStyle={styles.searchConatiner}
            cancelIcon={false}
            searchIcon={{ size: 24 }}
            onChangeText={(text: any) => searchFilterFunction(text)}
            onClear={(text: any) => searchFilterFunction('')}
            placeholder="Search by ID"
            value={searchtext}
          />
        </View>

        <TouchableOpacity style={{ marginRight: 20 }}>
          <View>
            <Icons name="filter" size={24} color="#2F4F4F" />
          </View>
          <View>
            <Text style={styles.mediumText}>{'Filter'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={[styles.backgroundView]}>
      {/* <View>
        <ScrollView
          horizontal={true}
          style={{backgroundColor: 'white', paddingBottom: 10}}>
          {sortMatchData.map((item: any, index: any) => (
            <View
              key={index}
              style={{
                height: 40,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
                borderWidth: 1,
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Text style={[styles.mediumHeaderText]}>{item['sortTitle']}</Text>
            </View>
          ))}
        </ScrollView>
      </View> */}

      {/* {search()} */}
      {matcheProfile()}
      <SavePreference
        savePreferenceVisiable={showPreference}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default MatchesScreen;
