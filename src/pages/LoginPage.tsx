import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import AppButton from '../components/AppButton';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import login, {setLoginId, setPaginationId} from '../redux/slices/login';
import IntlPhoneInput from 'react-native-intl-phone-input';
import Registration from './Registration';
import LoginService from '../services/LoginService';
import { setModalData } from '../redux/slices/appData';
import { createSecureService } from '../services/APIServices';
const style: any = GetStyle();
const LoginPage = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [inLoginPage, setInLoginPage] = React.useState(false);
  const [passwordinput, setPassword] = React.useState('');
  const [mobileinput, setMobile] = React.useState(0);
  const [countryCode, setCountryCode] = React.useState(0);

  const styles = GetStyle();
  useEffect(() => {
    createSecureService();
    setInLoginPage(false);
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          //style={[styles.submitButton]}
          onPress={setpagination}>
          <Text style={[styles.buttonHeaderText]}>{'REGISTER NOW'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const onChangeText = ({dialCode, unmaskedPhoneNumber, phoneNumber, isVerified}) => {
    setCountryCode(dialCode.replace("+", ""));
    setMobile(unmaskedPhoneNumber);
  };
  function signupButton() {
    const logindto={
            countryCode:Number(countryCode),
            mobileNumber: Number(mobileinput),
            password :passwordinput  
    }
    LoginService.getLoginDetail(logindto).then((response:any)=>{
        if(response){
            dispatch(setLoginId(response.data.id))
        }
    }).catch((error:any)=>{
        console.log('error:',error)})
  }
  function setpagination() {
    navigation.navigate('Registration');
  }
  function validation(type: any, value: any) {
    console.log();
  }
  return (
    <View style={[styles.sectionContainer]}>
      <View style={{width: '95%'}}>
        <View
          style={styles.loginTestbox}>
          <IntlPhoneInput
            phoneInputStyle={{
              flex: 1,
              marginLeft: 30,
              color: 'black',
              fontSize: 16.0,
            }}
            onChangeText={onChangeText}
            dialCodeTextStyle={{color: 'black'}}
            defaultCountry="IN"
            placeholder="Enter Mobile Number"
          />
        </View>
        <View
          style={styles.loginTestbox}>
          <TextInput
            placeholderTextColor="#2F4F4F"
            style={[styles.mediumText]}
            placeholder={'Enter Password'}
            secureTextEntry={true}
            //SonFocus={true}
            editable={true}
            //value={value}
            onChangeText={(data)=>setPassword(data)}
          />
        </View>
        <View>
          <AppButton onPress={signupButton} title={'Login'} disabled={false} />
        </View>
      </View>
    </View>
  );
};


export default LoginPage;
