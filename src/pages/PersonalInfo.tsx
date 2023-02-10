import AppDropDown from '../components/AppDropDown';
import TextInputWithIcon from '../components/TextInputWithIcon';
import IntlPhoneInput from 'react-native-intl-phone-input';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import AppTextInput from '../components/TextInput';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  getCountryCode,
  getRegistrationData,
  getReligion,
  setAccountId,

} from '../redux/slices/registration';
import RegistrationService from '../services/RegistrationService';
import { setModalData} from '../redux/slices/appData';
import { PersonalDto } from '../services/PersonalService';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void;
};

const PersonalInfo = ({navigation,updateEnableNext}: WizardProps) => {
  const dispatch: any = useAppDispatch();
  const [validmessage, setMessage] = React.useState(false);
  const personaldata=useAppSelector(state=>state.personal.personalData);
  const gender = [
    {label: 'FEMALE', value: '1'},
    {label: 'MALE', value: '2'},
    {label: 'OTHER', value: '3'},
  ];
  const creatorList = [{label: 'SELF', value: '1'}];
  useEffect(() => {

  }, [personaldata]);
  function onChangeValue(name:any,text:any){
    if(name == 'emailAddress'){
      personaldata.emailAddress=text
    }
    if(name == 'firstName'){
      personaldata.firstName=text
    }
    if(name == 'lastName'){
      personaldata.lastName=text
    }
    if(name == 'password'){
      personaldata.password=text
    }
  }
  function validatePersonalInfo(data: PersonalDto) {
    let message = '';
    if (data.countryCode === undefined) {
      message = message + 'country code';
    }
    if (data.firstName === undefined) {
      if (message != '') {
        message = message + ', name';
      }
    }
    if (message !== '') {
      console.log(message)
      setMessage(false);
      dispatch(
        setModalData({
          isVisible: true,
          title: '',
          message: 'Please specify ' + message,
          btnText: 'Close',
          canClose: true,
          showLoading: false,
        }),
      );
    } else {
      setMessage(true);
    }
  }
  function onSubmit(){
   console.log('test',personaldata)
    validatePersonalInfo(personaldata);
    console.log('nonvalidateaccountId',validmessage);
    if (validmessage) {
      console.log('validateaccountId');
      RegistrationService.getRegistrationDetail(personaldata)
        .then((response: any) => {
          if (response) {
            console.log('accountId', response.data);
            dispatch(setAccountId(response.data));
            updateEnableNext(true);
          }
        })
        .catch((error: any) => {
          console.log('error:', error);
        });
    }
  };


  const onChangeText = ({
    dialCode,
    unmaskedPhoneNumber,
    phoneNumber,
    isVerified,
  }) => {
    // setValue('countryCode', dialCode.replace('+', ''));
    // setValue('mobileNumber', unmaskedPhoneNumber);
    personaldata.mobileNumber=unmaskedPhoneNumber;
    personaldata.countryCode=dialCode.replace('+', '');
  };

  function setGenderdata(label: any) {
    personaldata.gender=label;
    //setValue('gender', label);
  }
  function setCreatordata(label: any) {
    personaldata.creator=label;
    // setValue('creator', label);
  }
  return (
    <View>
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Email'}
        databind={'emailAddress'}
        //value={personaldata.emailAddress}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'First Name'}
        databind={'firstName'}
        //value={personaldata.firstName}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Last Name'}
        databind={'lastName'}
        //value={personaldata.lastName}
      />
      <AppDropDown
        gender={gender}
        value={personaldata.gender}
        onSelection={setGenderdata}
        label={'Gender'}
      />
      <AppDropDown
        gender={creatorList}
        value={personaldata.creator}
        onSelection={setCreatordata}
        label={'Creator'}
      />
      <View style={[styles.textInputIconContainer, {height: 50}]}>
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
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Password'}
        databind={'password'}
        //value={personaldata.password}
      />
      <View
        style={{
          height: '10%',
          width: '100%',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={()=>onSubmit()}
          style={[styles.submitButton]}>
          <Text style={[styles.mediumHeaderText, styles.buttonText]}>
            {'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonalInfo;
