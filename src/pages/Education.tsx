import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TouchableOpacity, View,ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {GetStyle} from '../styles/style-sheet';
import AppDropDown from '../components/AppDropDown';
import EducationServices, {
  EducationDataDto,
} from '../services/EducationServices';
import DatePicker from 'react-native-date-picker';
import TextInputWithIcon from '../components/TextInputWithIcon';
import AppModalList from '../components/AppModalList';
import AppTextInput from '../components/TextInput';
import { createEducation, createProfessional } from '../redux/slices/education';
const dbDegree = [{label: 'B.Tech', value: 'B.Tech'}];
const dbCourse = [{label: 'CSE', value: 'CSE'}];
const dbEmployment = [
  {label: 'STUDYING', value: 'STUDYING'},
  {label: 'BUSINESS', value: 'BUSINESS'},
  {label: 'GOVERNMENT', value: 'GOVERNMENT'},
  {label: 'PRIVATE', value: 'PRIVATE'},
];
const dbCurrency = [
  {label: 'USD', value: 'USD'},
  {label: 'INR', value: 'INR'},
];

const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void;
};

const Education = ({navigation, updateEnableNext}: WizardProps) => {
  // const educationdata = useAppSelector(state => state.education.educationData);
  // const professionaldata = useAppSelector(
  //   state => state.education.professionalData,
  // );
  const accountId = useAppSelector(state => state.registration.accountId);
  const [showPassoutYear, setPassOutyearModel] = React.useState(false);
  const [loadYear, setLoadYearList] = React.useState(false);
  const [option, setOption] = React.useState('');
  const [yearList, setYearList] = React.useState([
    {
      id: '0',
      name: '',
      hasNextLevel: '',
      nextLevelName: '',
    },
  ]);

  const profile=useAppSelector(state=>state.loginId.profileData);
  const [educationdata, setEducationdata] = React.useState(createEducation());
  const [professionaldata, setProfessionaldata] = React.useState(createProfessional());
  const [intialpageLoad, setintialpageLoad] = React.useState(true);

  useEffect(() => {
    updateEnableNext(true)
    const currentYear = new Date().getFullYear();

    for (let year = 2000; year <= currentYear; year++) {
      yearList.push({
        id: year.toString(),
        name: year.toString(),
        hasNextLevel: '',
        nextLevelName: '',
      });
      if (year == currentYear) {
        setLoadYearList(!loadYear);
      }
    }
    if(intialpageLoad)
      {
        setEducationdata(profile.educationDetails)
        setProfessionaldata(profile.professionDetails)
        setintialpageLoad(false)
    }
  }, [navigation]);

  function setDegreedata(label: any) {
    var neweducationdata={...educationdata}
    neweducationdata.degree = label;
    setEducationdata(neweducationdata)
  }

  function setCoursedata(label: any) {
    var neweducationdata={...educationdata}
    neweducationdata.course = label;
    setEducationdata(neweducationdata)
  }
  function setEmploymentdata(label: any) {
    var newprofessionaldata={...professionaldata}
    newprofessionaldata.employment = label;
    setProfessionaldata(newprofessionaldata)
  }
  function setCurrencydata(label: any) {
    var newprofessionaldata={...professionaldata}
    newprofessionaldata.currency = label;
    setProfessionaldata(newprofessionaldata)
  }
  function onSubmit() {
    EducationServices.saveeducationDetail(educationdata, accountId)
      .then((response: any) => {
        if (response) {
          console.log('accountId', response);
          EducationServices.saveProfessionalDetail(professionaldata, accountId)
            .then((professinalResponse: any) => {
              console.log('professinalResponse', professinalResponse);
              updateEnableNext(true);
            })
            .catch((error: any) => {
              console.log('error:', error);
            });
        }
      })
      .catch((error: any) => {
        console.log('error:', error);
      });
  }

  function cancelYearModel() {
    setPassOutyearModel(!showPassoutYear);
  }
  function SelectedModelItem(id: any, title: any) {
    if (title === 'Year') {
      yearList.map((item: any) => {
        if (item.name == id) {
          var neweducationdata={...educationdata}
          neweducationdata.passoutYear = item.name;
          setEducationdata(neweducationdata)
          setPassOutyearModel(!showPassoutYear);
          //setLoadYearList(!loadYear)
        }
      });
    }
  }
  function onChangeValue(name: any, text: any) {
    var newprofessionaldata={...professionaldata}
    if (name == 'profession') {
      newprofessionaldata.profession = text;
    }
    if (name == 'company') {
      newprofessionaldata.company = text;
    }
    if (name == 'salary') {
      newprofessionaldata.salary = text;
    }
    setProfessionaldata(newprofessionaldata)
  }
  return (

    <ScrollView>
        <AppDropDown
        gender={dbDegree}
        value={educationdata.degree}
        onSelection={setDegreedata}
        label={'Degree'}
      />
      <AppDropDown
        gender={dbCourse}
        value={educationdata.course}
        onSelection={setCoursedata}
        label={'Course'}
      />
      <TextInputWithIcon
        lable={'PassOut Year'}
        onPress={setPassOutyearModel}
        dataBind={'year'}
        value={educationdata.passoutYear.toString()}
        icon={'chevron-forward-outline'}
      />

      <AppModalList
        modaldatalist={yearList}
        showReligious={showPassoutYear}
        cancelModel={cancelYearModel}
        option={option}
        onpress={SelectedModelItem}
        title={'Year'}
      />
      <AppDropDown
        gender={dbEmployment}
        value={professionaldata.employment}
        onSelection={setEmploymentdata}
        label={'Employment'}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Profession'}
        databind={'profession'}
        value={professionaldata.profession}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Company'}
        databind={'company'}
        value={professionaldata.company}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Salary'}
        databind={'salary'}
        value={professionaldata.salary.toString()}
      />
      <AppDropDown
        gender={dbCurrency}
        value={professionaldata.currency}
        onSelection={setCurrencydata}
        label={'Currency'}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onSubmit()}
        style={[styles.submitButton]}>
        <Text style={[styles.mediumHeaderText, styles.buttonText]}>
          {'Save'}
        </Text>
      </TouchableOpacity>
    

    </ScrollView>


  );
};
export default Education;
