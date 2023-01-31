import AppDropDown from '../components/AppDropDown';
import TextInputWithIcon from '../components/TextInputWithIcon';
import IntlPhoneInput from 'react-native-intl-phone-input';
import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/TextInput';
import LoginPage from './LoginPage';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  getCountryCode,
  getRegistrationData,
  getReligion,
  setAccountId,
  setRegistration,
} from '../redux/slices/registration';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import RegistrationService, {dropdowndata, listdata} from '../services/RegistrationService';
import AppModalList from '../components/AppModalList';
import {useForm} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {ModalData, setModalData} from '../redux/slices/appData';
import { RegistrationDto } from '../services/RegistrationService'
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void;
};

const PersonalInfo = ({navigation, updateEnableNext}: WizardProps) => {
  const [showReligious, setReligiousModel] = React.useState(false);
  const [selectedReligious, setselectedReligious] = React.useState(null);
  const [showCountryCode, setCountryCodeModel] = React.useState(false);
  const [selectedCountryCode, setCountryCode] = React.useState(null);
  const [selectedgender, setGender] = React.useState(null);
  const [selectedcreator, setCreator] = React.useState(null);
  const [selecteddob, setDataBirth] = React.useState('');
  const [showCalender, setCalenderModel] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const {register, handleSubmit, setValue} = useForm();
  const [selectedFormdata, setFormdata] = React.useState(null);
  const [option, setOption] = React.useState('');
  const religionData: any = useAppSelector(getReligion);
  const registrationData: any = useAppSelector(getRegistrationData);
  const countryCodeList: any = useAppSelector(getCountryCode);
  const dispatch: any = useAppDispatch();
  const [validmessage, setMessage] = React.useState(false);

  const gender = [
    {label: 'FEMALE', value: '1'},
    {label: 'MALE', value: '2'},
    {label: 'OTHER', value: '3'},
  ];
  const creatorList = [
    {label: 'SELF', value: '1'},
  ];
  useEffect(() => {
    try {
      setReligiousModel(false);
      const currentdate = moment(new Date())
        .subtract(21, 'year')
        .format('YYYY-MM-DD');
      setDataBirth(currentdate);
      registrationData.map((item: any, index: any) => register(item.databind));
      //setGender(gender[0].value)
    } catch (error) {
      console.log(error);
    }
  }, [navigation]);
  const onChangeField = useCallback(
    (name: any) => (text: any) => {
      setValue(name, text);
    },
    [],
  );
  function validatePersonalInfo(data: any) {
    let message = '';
    if (data['countryCode'] === undefined) {
      message = message + 'country code';
    }
    if (data['firstName'] === undefined) {
      if (message != '') {
        message = message + ', name';
      }
    }
    if (message !== '') {
      setMessage(false)
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
      setMessage(true)
    }
  }
  const onSubmit = useCallback((formData: RegistrationDto) => {
    formData.countryCode=Number(formData.countryCode)
    formData.mobileNumber=Number(formData.mobileNumber)
    validatePersonalInfo(formData);
    console.log('nonvalidateaccountId')
    if(validmessage){
      console.log('validateaccountId')
      RegistrationService.getRegistrationDetail(formData).then((response:any)=>{
        if(response){
           console.log('accountId',response.data)
            dispatch(setAccountId(response.data))
            updateEnableNext(true);
        }
    }).catch((error:any)=>{
        console.log('error:',error)})
  
    }
  }, []);
  function cancelModel() {
    setReligiousModel(!showReligious);
  }
  function SelectedItem(id: any) {
    religionData.map((item: any) => {
      if (item.id == id) {
        setselectedReligious(item.title);
        setValue('religion', item.title);
      }
    });
  }
  function onDateChange(date: Date) {
    const dateFormatted = date
      .toISOString()
      .slice(0, 10)
      .replace('-', '/')
      .replace('-', '/');
    setDataBirth(dateFormatted);
    setValue('dob', dateFormatted);
    setCalenderModel(false);
  }
  const hideDatePicker = () => {
    setCalenderModel(!showCalender);
  };
  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    onDateChange(date);
    hideDatePicker();
  };
  const onChangeText = ({
    dialCode,
    unmaskedPhoneNumber,
    phoneNumber,
    isVerified,
  }) => {
    setValue('countryCode', dialCode.replace('+',''));
    setValue('mobileNumber', unmaskedPhoneNumber);
  };
  function cancelCountryCodeModel() {
    setCountryCodeModel(!showCountryCode);
  }
  function SelectedCountryCodeItem(id: any) {
    countryCodeList.map((item: any) => {
      if (item.id === id) {
        setCountryCode(item.title);
        setValue('countryCode', item.title);
      }
    });
  }
  function setGenderdata(label: any) {
    setValue('gender', label);
  }
  function setCreatordata(label: any) {
    setValue('creator', label);
  }
  return (
    <View>
      {registrationData.map((item: any, index: any) => {
        if (item.textIcon === true) {
          if (item.databind === 'gender') {
            return (
              <AppDropDown
                key={index}
                gender={gender}
                value={selectedgender}
                onSelection={setGenderdata}
                label={item.title}
              />
            );
          }
          if (item.databind === 'creator') {
            return (
              <AppDropDown
                key={index}
                gender={creatorList}
                value={selectedcreator}
                onSelection={setCreatordata}
                label={item.title}
              />
            );
          }
          if(item.databind === 'mobileNumber'){
            return(
              <View
              key={index}
          style={[styles.textInputIconContainer, {height:50}]}>
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
           
            )
          }
        } else {
          return (
            <AppTextInput
              key={index}
              onChangeText={onChangeField}
              onFocus={true}
              lable={item.title}
              databind={item.databind}
            />
          );
        }
      })}
      <View
        style={{
          //borderRadius: 1,
          height: '10%',
          //borderTopWidth: 1,
          width: '100%',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleSubmit(onSubmit)}
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
