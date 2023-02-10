import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';
const dbDegree = [{label: 'B.Tech', value: '1'}];
const dbCourse = [{label: 'Cse', value: '1'}];
const dbEmployment = [
  {label: 'STUDYING', value: '1'},
  {label: 'BUSINESS', value: '2'},
  {label: 'GOVERNMENT', value: '3'},
  {label: 'PRIVATE', value: '4'},
];
const dbCurrency = [
  {label: 'USD', value: '1'},
  {label: 'INR', value: '2'},
];

const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void;
};

const Education = ({navigation, updateEnableNext}: WizardProps) => {
  const educationdata = useAppSelector(state => state.education.educationData);
  const professionaldata = useAppSelector(
    state => state.education.professionalData,
  );
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
  }, []);
  //   useEffect(() => {
  //   },[loadYear])
  function setDegreedata(label: any) {
    educationdata.degree = label;
  }

  function setCoursedata(label: any) {
    educationdata.course = label;
  }
  function setEmploymentdata(label: any) {
    professionaldata.employment = label;
  }
  function setCurrencydata(label: any) {
    professionaldata.currency = label;
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
          educationdata.passoutYear = item.name;
          setPassOutyearModel(!showPassoutYear);
          //setLoadYearList(!loadYear)
        }
      });
    }
  }
  function onChangeValue(name: any, text: any) {
    if (name == 'profession') {
      professionaldata.profession = text;
    }
    if (name == 'company') {
      professionaldata.company = text;
    }
    if (name == 'salary') {
      professionaldata.salary = text;
    }
  }
  return (

    <View>
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
        value={educationdata.passoutYear}
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
        //value={personaldata.emailAddress}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Company'}
        databind={'company'}
        //value={personaldata.emailAddress}
      />
      <AppTextInput
        onChangeText={onChangeValue}
        onFocus={true}
        lable={'Salary'}
        databind={'salary'}
        //value={personaldata.emailAddress}
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
    

    </View>


  );
};
export default Education;
