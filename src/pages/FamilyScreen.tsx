import React, { useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import { useAppSelector} from '../redux/hooks';
import {GetStyle} from '../styles/style-sheet';

import AppTextInput from '../components/TextInput';
import FamilyService from '../services/FamilyService';

const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void;
};

const Family = ({navigation, updateEnableNext}: WizardProps) => {
  const familydata = useAppSelector(state => state.family.familyData);

  const accountId = useAppSelector(state => state.registration.accountId);

  useEffect(() => {
    updateEnableNext(true)
  }, []);



  function onSubmit() {
    console.log(familydata)
    FamilyService.saveFamilyDetail(familydata, accountId)
      .then((response: any) => {
        if (response) {
          console.log('accountId', response);
        }
      })
      .catch((error: any) => {
        console.log('error:', error);
      });
  }


  function onChangeValue(name: any, text: any) {
    if (name == 'fatherName') {
        familydata.fatherName = text;
    }
    if (name == 'motherName') {
        familydata.motherName = text;
    }
    if (name == 'brothers') {
      familydata.brothers = Number(text);
    }
    if (name == 'sisters') {
        familydata.sisters = Number(text);
      }
  }
  return (

    <View>
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Father Name'}
        databind={'fatherName'}
        //value={personaldata.emailAddress}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Mother Name'}
        databind={'motherName'}
        //value={personaldata.emailAddress}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Number of Brothers'}
        databind={'brothers'}
        //value={personaldata.emailAddress}
      />
       <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Number of sisters'}
        databind={'sisters'}
        //value={personaldata.emailAddress}
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
