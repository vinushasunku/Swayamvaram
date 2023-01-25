import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import SafeAreaView from 'react-native-safe-area-view';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  getMatchList,
  getsortList,
  getMatchesList,
  getMoreMatchesList,
} from '../redux/slices/matches';
import {Avatar, Icon, SearchBar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
};

const MatchesScreen = ({navigation}: WizardProps) => {
  const sortMatchData: any = useAppSelector(getsortList);
  const getMatchList: any = useAppSelector(getMatchesList);
  const getMoreMatchList: any = useAppSelector(getMoreMatchesList);
  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchtext, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState([]);
  const [masterDataSource, setMasterDataSource] = React.useState([]);
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
  const fetchData = async () => {
    setData(getMatchList);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleOnEndReached = async () => {
    console.log('loadmore', stopFetchMore);
    setLoadingMore(true);
    if (!stopFetchMore) {
      if (data.length < 8) {
        setData([...data, ...getMoreMatchList]);
      }

      stopFetchMore = true;
    }
    setLoadingMore(false);
  };
  function matcheProfile() {
    const renderItem = ({item}) => {
      return (
        <View style={{marginBottom: 10 , borderRadius:10,overflow: 'hidden',}}>
          {/* <Image source={{uri: item.image}}
style={{width: 400, height: 400}} /> */}
          {/* <Text>{item.firstName}</Text> */}

          <ImageBackground
            style={{width: '100%', height: 280  }}
            source={{uri: item.image}}>
            <LinearGradient
              colors={['#00000000', '#000000']}
              style={{height: '100%', width: '100%',paddingLeft:10}}>
              <View style={{height: '65%'}}>

              </View>
              <Text
                style={{fontSize:20,
                  fontWeight:'bold',color:'white', paddingBottom:10}}>
                {item.firstName}
              </Text>
              <View style={{flexDirection: 'row', marginBottom:10, paddingBottom:10}}>
              <TouchableOpacity style={{marginRight:5}}>
                <Text style={{paddingRight: 10}}>
                  <Icons
                    name='checkmark-circle-outline'
                    size={50}
                    color="#FFAA33"
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight:5}}>
                <Text style={{paddingRight: 10}}>
                  <Icons
                    name='close-circle-outline'
                    size={50}
                    color="#c40000"
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight:5}}>
                <Text style={{paddingRight: 10}}>
                  <Icons
                    name='heart-circle-outline'
                    size={50}
                    color="green"
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight:5}}>
                <Text style={{paddingRight: 10}}>
                  <Icons
                    name='star-outline'
                    size={50}
                    color="green"
                  />
                </Text>
              </TouchableOpacity>
              </View>

            </LinearGradient>
          </ImageBackground>
        </View>
      );
    };
    return (
      <FlatList
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => {
          stopFetchMore = false;
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10 * 2.0}}
      />
    );
  }
  function search() {
    return (
      <View style={styles.searchView}>
        <View style={{flex: 1}}>
          <SearchBar
            round
            inputContainerStyle={styles.inputSearchContainer}
            containerStyle={styles.searchConatiner}
            cancelIcon={false}
            searchIcon={{size: 24}}
            onChangeText={(text: any) => searchFilterFunction(text)}
            onClear={(text: any) => searchFilterFunction('')}
            placeholder="Search by ID"
            value={searchtext}
          />
        </View>

        <TouchableOpacity style={{marginRight: 20}}>
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
    <View style={[styles.backgroundView]}>
      <View>
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
      </View>

      {search()}
      {matcheProfile()}
    </View>
  );
};

export default MatchesScreen;
