import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  getCountryCode,
  getRegistrationData,
  getReligion,
  setRegistration,
} from '../redux/slices/registration';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import PersonalInfo from './PersonalInfo';
import CasteInformation from './CasteInformation';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
};
const Registration = ({navigation}: WizardProps) => {
  const [showReligious, setReligiousModel] = React.useState(false);
  const [selectedReligious, setselectedReligious] = React.useState(null);
  const [showCountryCode, setCountryCodeModel] = React.useState(false);
  const [selectedCountryCode, setCountryCode] = React.useState(null);
  const [selectedgender, setGender] = React.useState(null);
  const [selecteddob, setDataBirth] = React.useState('');
  const [showCalender, setCalenderModel] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const {register, handleSubmit, setValue} = useForm();
  const [selectedFormdata, setFormdata] = React.useState(null);
  const [option, setOption] = React.useState('');
  const religionData: any = useAppSelector(getReligion);
  const registrationData: any = useAppSelector(getRegistrationData);
  const countryCodeList: any = useAppSelector(getCountryCode);
  const [enableNext, setEnableNext] = React.useState<boolean>(true);
  const gender = [
    {label: 'FEMALE', value: '1'},
    {label: 'MALE', value: '2'},
    {label: 'OTHER', value: '3'},
  ];
  const updateEnableNext = (enable: boolean):void => {
    console.log('enable',enable)
    setEnableNext(true)
}
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerBackVisible: true,
      headerRight: () => (
        <View style={{flexDirection:'row'}}>

        <TouchableOpacity
          onPress={setpagination}>
          <Text style={[styles.mediumHeaderText]}>{'Already member?Login'}</Text>
        </TouchableOpacity>
        </View>

      ),
    });

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
      console.log('onchangeField', name, text);
      setValue(name, text);
    },
    [],
  );
  const onSubmit = useCallback((formData: any) => {
    console.log('formdatasubmit', formData);
    setFormdata(formData);
    console.log('testselecte', selectedFormdata);
    //validation for form
  }, []);
  function setpagination() {
    navigation.navigate('LoginPage');
  }
  function cancelModel() {
    setReligiousModel(!showReligious);
  }
  function SelectedItem(id: any) {
    console.log('selectitem', id);
    religionData.map((item: any) => {
      console.log(item.id);
      if (item.id == id) {
        setselectedReligious(item.title);
        setValue('religion', item.title);
        console.log(selectedReligious);
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

  function cancelCountryCodeModel() {
    setCountryCodeModel(!showCountryCode);
  }
  function SelectedCountryCodeItem(id: any) {
    console.log('selectCountryitem', id);
    countryCodeList.map((item: any) => {
      if (item.id === id) {
        setCountryCode(item.title);
        setValue('countryCode', item.title);
      }
    });
  }
  function setGenderdata(label: any) {
    console.log('gender', label);
    setValue('gender', label);
  }
  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  };
  const buttonTextStyle = {
    color: '#686868',
    fontWeight: 'bold',
    display:'none'
  };
  const progressStepsStyle = {
    activeStepIconBorderColor: '#316BBE',
    activeLabelColor: '#686868',
    activeStepNumColor: 'white',
    activeStepIconColor: '#316BBE',
    completedStepIconColor: '#316BBE',
    completedProgressBarColor: '#316BBE',
    completedCheckColor: '#4bb543'
  };
  function onNextStep(){
    setEnableNext(!enableNext)
    console.log('nextenable',enableNext)
  }
  return (
    <View style={[styles.sectionContainer]}>
         <View>
         <ProgressSteps  {...progressStepsStyle}>
               <ProgressStep
            label="Info"
             onNext={onNextStep}
            //onPrevious={this.onPrevStep}
            //scrollViewProps={defaultScrollViewProps}
             nextBtnTextStyle={enableNext === true ?styles.nextpreviousText: styles.hideNext}
            //previousBtnTextStyle={buttonTextStyle}
          >
            <ScrollView style={{marginLeft: 15, marginTop: 10}}>
            <PersonalInfo navigation={navigation} updateEnableNext={updateEnableNext}/>
            </ScrollView>
              
          </ProgressStep>
          <ProgressStep
            label="Religion"
            previousBtnTextStyle={buttonTextStyle}
            nextBtnTextStyle={enableNext === true ?styles.nextpreviousText: styles.hideNext}
          >
            <ScrollView style={{marginLeft: 15, marginTop: 10}}>
            <CasteInformation navigation={navigation} updateEnableNext={updateEnableNext} />
            </ScrollView>
          </ProgressStep>
        <ProgressStep label="Completion">
            <View style={{ alignItems: 'center' }}>
                <Text>This is the content within step 3!</Text>
            </View>
        </ProgressStep>
        <ProgressStep label="Verification">
            <View style={{ alignItems: 'center' }}>
                <Text>This is the content within step 4!</Text>
            </View>
        </ProgressStep>
    </ProgressSteps>
    </View>
    </View>
    // <SafeAreaView>
    //   <View style={{flex: 1, marginLeft:10, marginRight:10}}>   
    //     <ProgressSteps {...progressStepsStyle}>
    //       <ProgressStep
    //         label="Info"
    //          onNext={onNextStep}
    //         //onPrevious={this.onPrevStep}
    //         //scrollViewProps={defaultScrollViewProps}
    //          nextBtnTextStyle={enableNext === true ?styles.nextpreviousText: styles.hideNext}
    //         //previousBtnTextStyle={buttonTextStyle}
    //       >
    //         <ScrollView style={{marginLeft: 15, marginTop: 10}}>
    //           <Text style={{color:'black'}}>{'Testmain'}</Text>
    //         <PersonalInfo navigation={navigation} updateEnableNext={updateEnableNext}/>
    //         </ScrollView>
              
    //       </ProgressStep>
    //       <ProgressStep
    //         label="Caste"
    //         //onNext={this.onNextStep}
    //         //onPrevious={this.onPrevStep}
    //         //scrollViewProps={defaultScrollViewProps}
    //         //nextBtnTextStyle={buttonTextStyle}
    //         previousBtnTextStyle={buttonTextStyle}
    //         nextBtnTextStyle={enableNext === true ?styles.nextpreviousText: styles.hideNext}
    //       >
    //         <ScrollView style={{marginLeft: 15, marginTop: 10}}>
    //         <CasteInformation navigation={navigation} updateEnableNext={updateEnableNext} />
    //         </ScrollView>
    //       </ProgressStep>
    //       <ProgressStep
    //         label="Location"
    //         //onNext={this.onNextStep}
    //         //onPrevious={this.onPrevStep}
    //         //scrollViewProps={defaultScrollViewProps}
    //         //nextBtnTextStyle={buttonTextStyle}
    //         //previousBtnTextStyle={buttonTextStyle}
    //       >
    //         <View style={{ alignItems: 'center' }}>
    //           <Text>This is the content within step 3!</Text>
    //         </View>
    //       </ProgressStep>
    //       <ProgressStep
    //         label="Fourth"
    //         //onNext={this.onNextStep}
    //         //onPrevious={this.onPrevStep}
    //        // scrollViewProps={defaultScrollViewProps}
    //        // nextBtnTextStyle={buttonTextStyle}
    //         //previousBtnTextStyle={buttonTextStyle}
    //       >
    //         <View style={{ alignItems: 'center' }}>
    //           <Text>This is the content within step 4!</Text>
    //         </View>
    //       </ProgressStep>
    //       <ProgressStep
    //         label="Fifth"
    //       >
    //         <View style={{ alignItems: 'center' }}>
    //           <Text>This is the content within step 5!</Text>
    //         </View>
    //       </ProgressStep>
    //     </ProgressSteps>    
    //   </View>
    // </SafeAreaView>
  );
};



export default Registration;
