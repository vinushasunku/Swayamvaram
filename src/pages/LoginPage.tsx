import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import AppButton from '../components/AppButton';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import login, {setLoginId, setPaginationId} from '../redux/slices/login';
import IntlPhoneInput from 'react-native-intl-phone-input';
import Registration from './Registration';
const style: any = GetStyle();
const LoginPage = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [inLoginPage, setInLoginPage] = React.useState(false);
  const [passwordinput, setPassword] = React.useState('');
  const [mobileinput, setMobile] = React.useState('');
  //const currentpagination=useAppSelector(state => state.loginId.pagination);
  const styles = GetStyle();
  useEffect(() => {
    setInLoginPage(false);
    console.log(inLoginPage);
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
  function signupButton() {
    //navigation.navigate('Signup')
    dispatch(setLoginId('12345678'));
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
            onChangeText={(mobileNumber ) =>setMobile(mobileNumber) }
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

LoginPage.navigationOption = {
  // return {
  //     header: () => null
  // }
  title: 'Login',
  headerTitleAlign: 'center',
  headerTintColor: 'black',
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: 'white',
  },
};
export default LoginPage;
