import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import AppButton from '../components/AppButton';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import  {setProfileInfo, setResitrationInfo} from '../redux/slices/login';
import LoginService from '../services/LoginService';
import { createSecureService } from '../services/APIServices';
import { setAccountId } from '../redux/slices/registration';
import AppTextInput from '../components/TextInput';

const style: any = GetStyle();
const LoginPage = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [inLoginPage, setInLoginPage] = React.useState(false);
  const [passwordinput, setPassword] = React.useState('');
  const [emailinput, setEmailPassword] = React.useState('');
  // const [mobileinput, setMobile] = React.useState(0);
  // const [countryCode, setCountryCode] = React.useState(0);

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
  // const onChangeText = ({dialCode, unmaskedPhoneNumber, phoneNumber, isVerified}) => {
  //   setCountryCode(dialCode.replace("+", ""));
  //   setMobile(unmaskedPhoneNumber);
  // };
  function signupButton() {
    const logindto={
            // countryCode:Number(countryCode),
            // mobileNumber: Number(mobileinput),
            emailAddress:emailinput,
            password :passwordinput  
    }
    LoginService.getLoginDetail(logindto).then((response:any)=>{
        if(response){
            dispatch(setProfileInfo(response.data))
            dispatch(setAccountId(response.data.id))
            if(response.data.personalDetails != null &&
              response.data.familyDetails !=null && 
              response.data.locationDetails !=null && 
               response.data.educationDetails !=null && 
               response.data.professionDetails !=null && 
              response.data.familyDetails != null 
               ){
               dispatch(setResitrationInfo(true))
            }else{
              navigation.navigate('Registration');
            }
          
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
  function onChangeValue(name: any, text: any) {
    if (name == 'email') {
      setEmailPassword(text)
    }
    if(name == 'password'){
      setPassword(text)
    }
  }
  return (
    <View style={{ justifyContent:'center'}}>
      <View style={style.welcomeTitle}>
      <Text
        style={style.loginTitle}>
        {"Welcome to Swayamvaram"}
      </Text>
      </View>
      {/* <ImageBackground 
                 style={{ width: '100%',
                 height: '100%',
                 flex: 1}}
                 resizeMode='cover' 
                 source={require('../assertsImg/loginBackGroundImg.png')}> */}
      <View style={{backgroundColor:'#fddfeb', height:'80%'}}>
      <View style={{backgroundColor:'white', marginLeft:15, marginRight:15, marginTop:50, marginBottom:30, borderRadius:5, borderWidth:0.25, borderColor:'grey', paddingBottom:50}}>
      <View style={{  marginLeft:10, marginRight:10, marginTop:50}}>
       <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Email address'}
        databind={'email'}
        value={emailinput}
      />
        <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Password'}
        databind={'password'}
        value={passwordinput}
      />
     <View style={{marginTop:20}}>
     <AppButton onPress={signupButton} title={'Continue'} disabled={false} />
     </View> 
      {/* <TextInput
            placeholderTextColor="#2F4F4F"
            //style={[styles.mediumText]}
            placeholder={'Enter Email'}
            //SonFocus={true}
            editable={true}
            //value={value}
            onChangeText={(data)=>setEmailPassword(data)}
          /> */}
      </View>
    
      </View>

      </View>


{/* </ImageBackground> */}
        {/* <View
          style={styles.loginTestbox}> */}

          {/* <TextInput
            placeholderTextColor="#2F4F4F"
            style={[styles.mediumText]}
            placeholder={'Enter Email'}
            //SonFocus={true}
            editable={true}
            //value={value}
            onChangeText={(data)=>setEmailPassword(data)}
          /> */}
          {/* <IntlPhoneInput
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
          /> */}
        {/* </View> */}
        {/* <View
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
        </View> */}
          {/* <AppButton onPress={signupButton} title={'Login'} disabled={false} /> */}
        </View>
  
  );
};


export default LoginPage;
