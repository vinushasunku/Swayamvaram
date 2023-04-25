import React, { useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import { useAppDispatch, useAppSelector} from '../redux/hooks';
import {GetStyle} from '../styles/style-sheet';

import AppTextInput from '../components/TextInput';
import FamilyService from '../services/FamilyService';
import { createFamily } from '../redux/slices/family';
import { setProfileInfo } from '../redux/slices/login';

const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void;
};

const Family = ({navigation, updateEnableNext}: WizardProps) => {
  //const familydata = useAppSelector(state => state.family.familyData);

  const accountId = useAppSelector(state => state.registration.accountId);
  const profile=useAppSelector(state=>state.loginId.profileData);
  const [familydata, setFamilydata] = React.useState(createFamily());
  const [intialpageLoad, setintialpageLoad] = React.useState(true);
  const dispatch: any = useAppDispatch();
  useEffect(() => {
    updateEnableNext(true)
    if(profile.personalDetails && intialpageLoad){
      setFamilydata(profile.familyDetails);
      setintialpageLoad(false)
    }
  
  }, [familydata]);

  // useEffect(() => {
  //   updateEnableNext(true)
  
  //   }, [familydata]);

  function onSubmit() {
    console.log('family',accountId)
    FamilyService.saveFamilyDetail(familydata, accountId)
      .then((response: any) => {
        if (response) {
          profile.familyDetails=familydata;
          dispatch(setProfileInfo(profile))
        }
      })
      .catch((error: any) => {
        console.log('error:', error);
      });
  }


  function onChangeValue(name: any, text: any) {
    var newfamilydata={...familydata}
    if (name == 'fatherName') {
      newfamilydata.fatherName = text;
    }
    if (name == 'motherName') {
      newfamilydata.motherName = text;
    }
    if (name == 'brothers') {
      newfamilydata.brothers = Number(text);
    }
    if (name == 'sisters') {
      newfamilydata.sisters = Number(text);
      }
      setFamilydata(newfamilydata)
  }
  return (

    <View>
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Father Name'}
        databind={'fatherName'}
        value={familydata.fatherName}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Mother Name'}
        databind={'motherName'}
        value={familydata.motherName}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Number of Brothers'}
        databind={'brothers'}
        value={familydata.brothers.toString()}
      />
       <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Number of sisters'}
        databind={'sisters'}
        value={familydata.sisters.toString()}
      />

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onSubmit()}
        style={[styles.submitButton]}>
        <Text style={[styles.mediumHeaderText, styles.buttonText]}>
          {'Save'}
        </Text>
      </TouchableOpacity>
    

    </View>


  );
};
export default Family;
