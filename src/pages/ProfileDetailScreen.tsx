import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import SafeAreaView from 'react-native-safe-area-view';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {fetchMatchingStatus, fetchProfiledetail} from '../redux/slices/matches';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import MatchesService from '../services/MatchesService';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/colors';
import {
  acceptButton,
  rejectButton,
  sendButton,
  withdrawalButton,
} from '../utils/actionfunctions';
import PersonalInfo from './PersonalInfo';
import ProfileEdit from './ProfileEdit';
import {
  createProfile,
  setEditProfileDetailInfo,
  setEditType,
} from '../redux/slices/login';
import {typeProfileDetail} from '../services/RegistrationService';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {useIsFocused} from '@react-navigation/native';

const styles: any = GetStyle();
type WizardProps = {
  navigation: any;

  //edit:boolean;
};

export const ProfileDetailScreen = ({navigation}: WizardProps) => {
  const accountId = useAppSelector(state => state.registration.accountId);
  const selectProfileId = useAppSelector(
    state => state.matches.selectedProfileId,
  );
  const profileDetail = useAppSelector(state => state.matches.profileDetail);
  const matchingstatus = useAppSelector(state => state.matches.matchingStatus);
  const profileEditVisiable = useAppSelector(
    state => state.loginId.editProfileDetail,
  );
  const editType = useAppSelector(state => state.loginId.editType);
  const [doneLoading, setStatusLoading] = useState(false);
  const editBackPage = useAppSelector(state => state.loginId.editProfile);
  const dispatch: any = useAppDispatch();
  const Tab = createMaterialTopTabNavigator();
  const isFocused = useIsFocused();
  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Personal" component={PersonalInfoRoute} />
        <Tab.Screen name="Religious" component={ReligiousInfoRoute} />
        <Tab.Screen name="Professional" component={ProfessionalInfoRoute} />
      </Tab.Navigator>
    );
  }
  // useEffect(()=>{

  // },[profileEditVisiable])
  useEffect(() => {
    if (editBackPage === false && selectProfileId.selectedProfileId != '') {
      console.log('select profile', selectProfileId);
      dispatch(fetchMatchingStatus(selectProfileId))
        .unwrap()
        .then((response: any) => {
          console.log('matchingstatus', matchingstatus);
        })
        .catch((error: any) => {
          console.log('get matches list', error);
        });
    }
  }, [selectProfileId]);
  const actionDisplay = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: Colors.Grey,
        }}>
        {matchingstatus.statusReason.requestSentByProfileId !=
        matchingstatus.profile1Id ? (
          matchingstatus.status === 'NONE' ||
          matchingstatus.status === 'WITHDRAWN' ? (
            <View style={[{flexDirection: 'row'}]}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {marginTop: 10, width: '42%', alignItems: 'center'},
                ]}
                onPress={() => {
                  sendButton(
                    selectProfileId.accountId,
                    selectProfileId.selectedProfileId,
                  );
                }}>
                <Text style={[styles.buttonText]}>{'Send'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {
                    marginTop: 10,
                    marginLeft: 0,
                    width: '42%',
                    marginRight: 20,
                    alignItems: 'center',
                  },
                ]}
                onPress={() => {
                  rejectButton(
                    selectProfileId.accountId,
                    selectProfileId.selectedProfileId,
                  );
                }}>
                <Text style={[styles.buttonText]}>{'Not Intrested'}</Text>
              </TouchableOpacity>
            </View>
          ) : matchingstatus.status === 'REQUEST_SENT' ? (
            <View style={[{flexDirection: 'row'}]}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {marginTop: 10, alignItems: 'center'},
                ]}
                onPress={() => {
                  withdrawalButton(
                    selectProfileId.accountId,
                    selectProfileId.selectedProfileId,
                  );
                }}>
                <Text style={[styles.buttonText]}>
                  {'WithDraw your request'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {matchingstatus.statusReason.requestSentByProfileId ===
        matchingstatus.profile1Id ? (
          matchingstatus.status === 'REQUEST_SENT' ? (
            <View style={[{flexDirection: 'row'}]}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {marginTop: 10, width: '42%', alignItems: 'center'},
                ]}
                onPress={() => {
                  acceptButton(
                    selectProfileId.accountId,
                    selectProfileId.selectedProfileId,
                  );
                }}>
                <Text style={[styles.buttonText]}>{'Accept'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {
                    marginTop: 10,
                    marginLeft: 0,
                    width: '42%',
                    marginRight: 20,
                    alignItems: 'center',
                  },
                ]}
                onPress={() => {
                  rejectButton(
                    selectProfileId.accountId,
                    selectProfileId.selectedProfileId,
                  );
                }}>
                <Text style={[styles.buttonText]}>{'Reject'}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </View>
    );
  };
  const updateEnableNext = (enable: boolean): void => {
    // setEnableNext(true);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {actionDisplay()}
        {MyTabs()}
      </View>
      <ProfileEdit
        profileEditVisiable={profileEditVisiable}
        editType={editType}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
const PersonalInfoRoute = ({navigation}) => {
  let selectedprofileDetail = useAppSelector(
    state => state.matches.profileDetail,
  );
  const editBackPage = useAppSelector(state => state.loginId.editProfile);
  let loginprofileDetail = useAppSelector(state => state.loginId.profileData);
  const [profileDetail, setprofileDetail] = React.useState(createProfile());
  const profileEditVisiable = useAppSelector(
    state => state.loginId.editProfileDetail,
  );
  const selectProfileId = useAppSelector(
    state => state.matches.selectedProfileId,
  );
  const isFocused = useIsFocused();

  const dispatch: any = useAppDispatch();
  useEffect(() => {
    if (editBackPage) {
      setprofileDetail(loginprofileDetail);
      console.log('selected profile2', loginprofileDetail);
    } else {
      console.log('selected profile', selectedprofileDetail);
      setprofileDetail(selectedprofileDetail);
    }
  }, [editBackPage, profileDetail, isFocused, profileEditVisiable]);
  // useEffect(() => {
  //   setprofileDetail(selectedprofileDetail)
  //   console.log('test loading',profileDetail)
  // },[profileDetail])

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingLeft: 20}}>
      <Text style={[styles.mediumHeaderText, {paddingTop: 20, fontSize: 20}]}>
        {'Personal Information'}
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          marginRight: 10,
          paddingBottom: 20,
          borderRadius: 10,
          paddingLeft: 20,
        }}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={[styles.mediumHeaderText, {fontSize: 20}]}>
            {'Basic Detail'}
          </Text>
          {editBackPage ? (
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                right: 10,
                position: 'absolute',
              }}
              onPress={() => {
                dispatch(setEditType(typeProfileDetail.Basic));
                dispatch(setEditProfileDetailInfo(true));
              }}>
              <Icon
                name={'pencil-outline'}
                size={25}
                color={Colors.FrenchRose}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>
            {'First Name'}
          </Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.personalDetails?.firstName != null
              ? profileDetail?.personalDetails?.firstName
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'Last Name'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.personalDetails?.lastName != null
              ? profileDetail?.personalDetails?.lastName
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'Gender'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.personalDetails?.gender != null
              ? profileDetail?.personalDetails?.gender
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>
            {'Phone number'}
          </Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.personalDetails?.mobileNumber != null
              ? '+' +
                profileDetail?.personalDetails?.countryCode +
                profileDetail?.personalDetails?.mobileNumber
              : 'No Information'}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          marginRight: 10,
          paddingBottom: 20,
          borderRadius: 10,
          paddingLeft: 20,
        }}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={[styles.mediumHeaderText, {fontSize: 20}]}>
            {'Family Details'}
          </Text>
          {editBackPage ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(setEditType(typeProfileDetail.FamilyDetail));
                dispatch(setEditProfileDetailInfo(true));
              }}
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                right: 10,
                position: 'absolute',
              }}>
              <Icon
                name={'pencil-outline'}
                size={25}
                color={Colors.FrenchRose}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>
            {'Father Name'}
          </Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.familyDetails?.fatherName != null
              ? profileDetail?.familyDetails.fatherName
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>
            {'Mother Name'}
          </Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.familyDetails?.motherName != null
              ? profileDetail?.familyDetails?.motherName
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'Brother'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.familyDetails?.brothers != null
              ? profileDetail?.familyDetails?.brothers
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'Sister'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.familyDetails?.sisters != null
              ? profileDetail?.familyDetails?.sisters
              : 'No Information'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ReligiousInfoRoute = () => {
  //const profileDetail = useAppSelector(state => state.matches.profileDetail);
  const isFocused = useIsFocused();
  let selectedprofileDetail = useAppSelector(
    state => state.matches.profileDetail,
  );
  const editBackPage = useAppSelector(state => state.loginId.editProfile);
  let loginprofileDetail = useAppSelector(state => state.loginId.profileData);
  const [profileDetail, setprofileDetail] = React.useState(createProfile());
  const profileEditVisiable = useAppSelector(
    state => state.loginId.editProfileDetail,
  );
  const dispatch: any = useAppDispatch();
  useEffect(() => {
    if (editBackPage) {
      setprofileDetail(loginprofileDetail);
      console.log('selected profile2', loginprofileDetail);
    } else {
      console.log('selected profile', selectedprofileDetail);
      setprofileDetail(selectedprofileDetail);
    }
  }, [editBackPage, profileDetail, isFocused, profileEditVisiable]);
  // useEffect(() => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white', paddingLeft: 20}}>
      <Text style={[styles.mediumHeaderText, {paddingTop: 20, fontSize: 20}]}>
        {'Religious/Location Information'}
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          marginRight: 10,
          paddingBottom: 20,
          borderRadius: 10,
          paddingLeft: 20,
        }}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text
            style={[styles.mediumHeaderText, {paddingTop: 20, fontSize: 20}]}>
            {'Caste Detail'}
          </Text>
          {editBackPage ? (
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                right: 10,
                position: 'absolute',
              }}
              onPress={() => {
                dispatch(setEditType(typeProfileDetail.CasteDetail));
                dispatch(setEditProfileDetailInfo(true));
              }}>
              <Icon
                name={'pencil-outline'}
                size={25}
                color={Colors.FrenchRose}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'religion'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.regionDetails?.religion != null
              ? profileDetail?.regionDetails?.religion
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'Caste'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.regionDetails?.caste != null
              ? profileDetail?.regionDetails?.caste
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'Sub Caste'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.regionDetails?.subCaste != null
              ? profileDetail?.regionDetails?.subCaste
              : 'No Information'}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          marginRight: 10,
          paddingBottom: 20,
          borderRadius: 10,
          paddingLeft: 20,
        }}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text
            style={[styles.mediumHeaderText, {paddingTop: 20, fontSize: 20}]}>
            {'Location Details'}
          </Text>
          {editBackPage ? (
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                right: 10,
                position: 'absolute',
              }}
              onPress={() => {
                dispatch(setEditType(typeProfileDetail.LocationDetail));
                dispatch(setEditProfileDetailInfo(true));
              }}>
              <Icon
                name={'pencil-outline'}
                size={25}
                color={Colors.FrenchRose}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'Country'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.locationDetails?.country != null
              ? profileDetail?.locationDetails.country
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'State'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.locationDetails?.state != null
              ? profileDetail?.locationDetails?.state
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'City'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.locationDetails?.city != null
              ? profileDetail?.locationDetails?.city
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>
            {'Citizenship'}
          </Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.locationDetails?.citizenship != null
              ? profileDetail?.locationDetails?.citizenship
              : 'No Information'}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          marginRight: 10,
          paddingBottom: 20,
          borderRadius: 10,
          paddingLeft: 20,
        }}>
        <Text style={[styles.mediumHeaderText, {paddingTop: 20, fontSize: 20}]}>
          {'Visa Information'}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>
            {'Visa Status'}
          </Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.locationDetails?.visaStatus != null
              ? profileDetail?.locationDetails.visaStatus
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>
            {'Visa Expiry'}
          </Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.locationDetails?.visaExpiryYear != null &&
            profileDetail?.locationDetails?.visaExpiryMonth
              ? profileDetail?.locationDetails?.visaExpiryMonth +
                '/' +
                profileDetail?.locationDetails?.visaExpiryYear
              : 'No Information'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const ProfessionalInfoRoute = () => {
  let selectedprofileDetail = useAppSelector(
    state => state.matches.profileDetail,
  );
  const editBackPage = useAppSelector(state => state.loginId.editProfile);
  let loginprofileDetail = useAppSelector(state => state.loginId.profileData);
  const [profileDetail, setprofileDetail] = React.useState(createProfile());
  const profileEditVisiable = useAppSelector(
    state => state.loginId.editProfileDetail,
  );
  const selectProfileId = useAppSelector(
    state => state.matches.selectedProfileId,
  );
  const isFocused = useIsFocused();

  const dispatch: any = useAppDispatch();
  useEffect(() => {
    if (editBackPage) {
      setprofileDetail(loginprofileDetail);
    } else {
      setprofileDetail(selectedprofileDetail);
    }
  }, [editBackPage, profileDetail, isFocused, profileEditVisiable]);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingLeft: 20}}>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text style={[styles.mediumHeaderText, {paddingTop: 20, fontSize: 20}]}>
          {'Professional Information'}
        </Text>
        {editBackPage ? (
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              right: 10,
              position: 'absolute',
            }}
            onPress={() => {
              dispatch(setEditType(typeProfileDetail.ProfessionalDetail));
              dispatch(setEditProfileDetailInfo(true));
            }}>
            <Icon name={'pencil-outline'} size={25} color={Colors.FrenchRose} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          marginRight: 10,
          paddingBottom: 20,
          borderRadius: 10,
          paddingLeft: 20,
        }}>
        <Text style={[styles.mediumHeaderText, {paddingTop: 20, fontSize: 20}]}>
          {'Basic Detail'}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>
            {'Employment'}
          </Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.professionDetails?.employment != null
              ? profileDetail?.professionDetails?.employment
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>
            {'Profession'}
          </Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.professionDetails?.profession != null
              ? profileDetail?.professionDetails?.profession
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'Company'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.professionDetails?.company != null
              ? profileDetail?.professionDetails?.company
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'salary'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.professionDetails?.salary != null
              ? profileDetail?.professionDetails?.currency +
                ' ' +
                profileDetail?.professionDetails?.salary
              : 'No Information'}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          marginRight: 10,
          paddingBottom: 20,
          borderRadius: 10,
          paddingLeft: 20,
        }}>
        <Text style={[styles.mediumHeaderText, {paddingTop: 20, fontSize: 20}]}>
          {'Education Details'}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'Degree'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.educationDetails?.degree != null
              ? profileDetail?.educationDetails.degree
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>{'Course'}</Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.educationDetails?.course != null
              ? profileDetail?.educationDetails?.course
              : 'No Information'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.mediumText, {width: '50%'}]}>
            {'Pass out year'}
          </Text>
          <Text style={[styles.mediumText, {width: '10%'}]}>{'-'}</Text>
          <Text style={[styles.mediumText]}>
            {profileDetail?.educationDetails?.passoutYear != null
              ? profileDetail?.educationDetails?.passoutYear
              : 'No Information'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetailScreen;
