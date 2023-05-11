import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { GetStyle } from '../styles/style-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/colors';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Age, ListDropDownDto, PrefrenceDataDto, Salary } from '../services/MatchesService';
import AppDropDown from '../components/AppDropDown';
import TextInputWithIcon from '../components/TextInputWithIcon';
import MultiSelectionList from '../components/MultiSelectionList';
import { fetchCountrylists } from '../redux/slices/location';
import { GetCasteList, GetReligionList, GetSubCasteList } from '../utils/actionfunctions';
import AppModalList from '../components/AppModalList';
import AppButton from '../components/AppButton';
import { setPreferenceVisiable } from '../redux/slices/matches';

const dbCurrency = [
  { label: 'USD', value: 'USD' },
  { label: 'INR', value: 'INR' },
];

const styles: any = GetStyle();
type WizardProps = {
  savePreferenceVisiable: any;
  navigation: any;
};
export const SavePreference = ({
  savePreferenceVisiable,
  navigation,
}: WizardProps) => {
  const dispatch: any = useAppDispatch();

  const [prefrenceData, setPrefrencedata] = React.useState(createPrefrence());
  const [listVisaStatus, setListVisaStatus] = React.useState(createDropDownList());
  const [showVisaModal, setShowVisaModel] = React.useState(false);
  const [listEmployment, setEmployment] = React.useState(createEmploymentList());
  const [showEmploymentModal, setShowEmploymentModel] = React.useState(false);
  const [showCountryModal, setShowCountryModel] = React.useState(false);
  const [showReligionModal, setShowReligionModel] = React.useState(false);
  const [showCasteModal, setShowCasteModel] = React.useState(false);
  const [showSubCasteModal, setShowSubCasteModel] = React.useState(false);
  const countryList = useAppSelector(state => state.location.countryData);
  const [pageLoading, setPageLoading] = React.useState(true);
  const religionList = useAppSelector(state => state.religion.religionData);
  const casteList = useAppSelector(state => state.religion.casteList);
  const subcasteList = useAppSelector(state => state.religion.subCasteList);
  const [doneLoading, setStatusLoading] = useState(false);
  const [option, setOption] = React.useState('');
  const refreshData = () => setStatusLoading(false)
  function createPrefrence(): PrefrenceDataDto {
    return {
      age: createAge(),
      salary: createSalary(),
      salaryCurrency: '',
      visaStatus: [],
      employment: [],
      countries: [],
      religions: [],
      castes: [],
      subCastes: [],
      profession: []
    };
  }
  function createDropDownList(): ListDropDownDto[] {
    return [
      {
        name: 'STUDENT_VISA', id: 'STUDENT_VISA', hasNextLevel: '',
        nextLevelName: ''
      },
      {
        name: 'STUDENT_WORK_VISA', id: 'STUDENT_WORK_VISA', hasNextLevel: '',
        nextLevelName: ''
      },
      {
        name: 'WORK_VISA', id: 'WORK_VISA', hasNextLevel: '',
        nextLevelName: ''
      },
      {
        name: 'PR', id: 'PR', hasNextLevel: '',
        nextLevelName: ''
      }
    ]
  }
  function createEmploymentList(): ListDropDownDto[] {
    return [
      {
        id: 'STUDYING', name: 'STUDYING', hasNextLevel: '',
        nextLevelName: ''
      },
      {
        id: 'BUSINESS', name: 'BUSINESS', hasNextLevel: '',
        nextLevelName: ''
      },
      {
        id: 'GOVERNMENT', name: 'GOVERNMENT', hasNextLevel: '',
        nextLevelName: ''
      },
      {
        id: 'PRIVATE', name: 'PRIVATE', hasNextLevel: '',
        nextLevelName: ''
      },
    ]
  }
  function createAge(): Age {
    return {
      min: undefined,
      max: undefined
    }
  }

  function createSalary(): Salary {
    return {
      min: undefined,
      max: undefined
    }
  }

  useEffect(() => {
    setPageLoading(true);
    if (pageLoading && (countryList.length <= 1 && countryList[0].id === '')) {
      console.log(countryList.length, countryList[0].id)
      dispatch(fetchCountrylists())
        .unwrap()
        .then(() => {
          setPageLoading(false);
        })
        .catch((error: any) => {
          setPageLoading(false);
        });
    }
    console.log('resligioncount', religionList.length)
    if (religionList.length <= 1 && religionList[0].id === '') {
      if (GetReligionList()) {
        setStatusLoading(true);
      }
    }
  }, [prefrenceData]);
  useEffect(() => {
    refreshData()
  }, [doneLoading])
  //   const [agelist, setageList]=useState(CreateAgeList());
  function SelectedModelItem(id: any, title: any) {
    if (title === 'Visa') {
      listVisaStatus.map((item: any) => {
        if (item.name == id) {
          var newprefrenceData = { ...prefrenceData }
          newprefrenceData.visaStatus = [...newprefrenceData.visaStatus, item.name];
          setPrefrencedata(newprefrenceData)
          //setShowVisaModel(!showVisaModal);
          //setLoadYearList(!loadYear)
        }
      });
    }

    if (title === 'Employment') {
      listEmployment.map((item: any) => {
        if (item.name == id) {
          var newprefrenceData = { ...prefrenceData }
          newprefrenceData.employment = [...newprefrenceData.employment, item.name];
          setPrefrencedata(newprefrenceData)
          //setShowVisaModel(!showVisaModal);
          //setLoadYearList(!loadYear)
        }
      });
    }
    if (title === 'Country') {
      countryList.map((item: any) => {
        if (item.name == id) {
          var newprefrenceData = { ...prefrenceData }
          newprefrenceData.countries = [...newprefrenceData.countries, item.name];
          setPrefrencedata(newprefrenceData)
          //setShowVisaModel(!showVisaModal);
          //setLoadYearList(!loadYear)
        }
      });
    }
    if (title === 'Religion') {
      religionList.map((item: any) => {
        if (item.name == id) {
          var newprefrenceData = { ...prefrenceData }
          if (newprefrenceData.religions[0] != item.name) {
            newprefrenceData.religions = [item.name];
            if (GetCasteList(item.name)) {
              setStatusLoading(!doneLoading)
            }
          }

          setPrefrencedata(newprefrenceData)

        }
      });
    }
    if (title === 'Caste') {
      casteList.map((item: any) => {
        if (item.name == id) {
          var newprefrenceData = { ...prefrenceData }
          if (newprefrenceData.castes[0] != item.name) {
            newprefrenceData.castes = [item.name];
            if (GetSubCasteList(newprefrenceData.religions[0], item.name)) {
              setStatusLoading(!doneLoading)
            }
          }
          setPrefrencedata(newprefrenceData)

        }
      });
    }
    if (title === 'SubCaste') {
      subcasteList.map((item: any) => {
        if (item.name == id) {
          var newprefrenceData = { ...prefrenceData }
          if (newprefrenceData.subCastes[0] != item.name) {
            newprefrenceData.subCastes = [item.name];
          }

          setPrefrencedata(newprefrenceData)

        }
      });
    }
  }
  function onChangeText(databind:any, value:any){
    var newprefrenceData = { ...prefrenceData }
    value=Number(value)
     if(databind === "minAge"){
      newprefrenceData.age.min=value;  
     }
     if(databind === "maxAge"){
      newprefrenceData.age.max=value;  
     }
     if(databind === "minSalary"){
      newprefrenceData.salary.min=value;  
     }
     if(databind === "maxSalary"){
      newprefrenceData.salary.max=value;  
     }
     setPrefrencedata(newprefrenceData)
  }
  function onSubmit() { 
    console.log('preference data',prefrenceData)
    //prefrenceData.age.min=Number( prefrenceData.age.min)
  }
  function back() {
    dispatch(setPreferenceVisiable(false));
  }
  function setCurrencydata(label: any) {
    var newprefrencessdata = { ...prefrenceData }
    newprefrencessdata.salaryCurrency = label;
    setPrefrencedata(newprefrencessdata)
  }
  function cancelVisaModel() {
    setShowVisaModel(false)
  }
  function cancelEmploymentModel() {
    setShowEmploymentModel(false)
  }
  function cancelCountryModel() {
    setShowCountryModel(false)
  }
  function cancelReligionModel() {
    setShowReligionModel(false)
  }
  function cancelCasteModel() {
    setShowCasteModel(false)
  }
  function cancelSubCasteModel() {
    setShowSubCasteModel(false)
  }

  function basicPrefrence() {
    return (
      <View style={{ marginTop: 20, marginBottom: 40 }}>
        <View style={{ height: 100 }}>
          <View style={[{ flexDirection: 'row', marginLeft: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.mediumHeaderText]}>{'Min Age'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.mediumHeaderText]}>{'Max Age'}</Text>
            </View>
          </View>
          <View style={[styles.horizotalDiv, { marginTop: 10 }]}>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholderTextColor="#2F4F4F"
                style={[styles.mediumText, styles.textInput, { marginRight: 10 }]}
                editable={true}
                value={prefrenceData.age.min?.toString()}
                onChangeText={(value) => onChangeText('minAge',value)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholderTextColor="#2F4F4F"
                style={[styles.mediumText, styles.textInput, { marginRight: 10 }]}
                editable={true}
                value={prefrenceData.age.max}
                onChangeText={(value) => onChangeText('maxAge',value)}
              />
            </View>

          </View>
        </View>
        <View style={{ height: 100 }}>
          <View style={[{ flexDirection: 'row', marginLeft: 10 }]}>
            <View style={{ flex: 2 }}>
              <Text style={[styles.mediumHeaderText]}>{'Min Salary'}</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={[styles.mediumHeaderText]}>{'Max Salary'}</Text>
            </View>
          </View>
          <View style={[styles.horizotalDiv, { marginTop: 10 }]}>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholderTextColor="#2F4F4F"
                style={[styles.mediumText, styles.textInput, { marginRight: 10 }]}
                editable={true}
                value={prefrenceData.salary.min}
              onChangeText={(value) => onChangeText('minSalary',value)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholderTextColor="#2F4F4F"
                style={[styles.mediumText, styles.textInput, { marginRight: 10 }]}
                editable={true}
                value={prefrenceData.salary.max}
                onChangeText={(value) => onChangeText('maxSalary',value)}
              />
            </View>

          </View>
        </View>
        <View style={{ marginLeft: 10 }}>
          <AppDropDown
            gender={dbCurrency}
            value={prefrenceData.salaryCurrency}
            onSelection={setCurrencydata}
            label={'Currency'}
          />
          <TextInputWithIcon
            lable={'Visa Status'}
            onPress={setShowVisaModel}
            dataBind={'Visa'}
            value={prefrenceData.visaStatus.toString()}
            icon={'chevron-forward-outline'}
          />
          <MultiSelectionList
            modaldatalist={listVisaStatus}
            showReligious={showVisaModal}
            cancelModel={cancelVisaModel}
            onpress={SelectedModelItem}
            title={'Visa'}
            selectedItem={prefrenceData.visaStatus}
          />
          <TextInputWithIcon
            lable={'Employment'}
            onPress={setShowEmploymentModel}
            dataBind={'Employment'}
            value={prefrenceData.employment.toString()}
            icon={'chevron-forward-outline'}
          />
          <MultiSelectionList
            modaldatalist={listEmployment}
            showReligious={showEmploymentModal}
            cancelModel={cancelEmploymentModel}
            onpress={SelectedModelItem}
            title={'Employment'}
            selectedItem={prefrenceData.employment}
          />
          <TextInputWithIcon
            lable={'Country'}
            onPress={setShowCountryModel}
            dataBind={'Country'}
            value={prefrenceData.countries.toString()}
            icon={'chevron-forward-outline'}
          />
          <MultiSelectionList
            modaldatalist={countryList}
            showReligious={showCountryModal}
            cancelModel={cancelCountryModel}
            onpress={SelectedModelItem}
            title={'Country'}
            selectedItem={prefrenceData.countries}
          />
          <TextInputWithIcon
            lable={'Religion'}
            onPress={setShowReligionModel}
            dataBind={'Religion'}
            value={prefrenceData.religions.toString()}
            icon={'chevron-forward-outline'}
          />
          <AppModalList
            modaldatalist={religionList}
            showReligious={showReligionModal}
            cancelModel={cancelReligionModel}
            option={option}
            onpress={SelectedModelItem}
            title={'Religion'}
          />
          <TextInputWithIcon
            lable={'Caste'}
            onPress={setShowCasteModel}
            dataBind={'Caste'}
            value={prefrenceData.castes.toString()}
            icon={'chevron-forward-outline'}
          />
          <AppModalList
            modaldatalist={casteList}
            showReligious={showCasteModal}
            cancelModel={cancelCasteModel}
            option={option}
            onpress={SelectedModelItem}
            title={'Caste'}
          />
          <TextInputWithIcon
            lable={'SubCaste'}
            onPress={setShowSubCasteModel}
            dataBind={'SubCaste'}
            value={prefrenceData.subCastes.toString()}
            icon={'chevron-forward-outline'}
          />
          <AppModalList
            modaldatalist={subcasteList}
            showReligious={showSubCasteModal}
            cancelModel={cancelSubCasteModel}
            option={option}
            onpress={SelectedModelItem}
            title={'SubCaste'}
          />
          <View style={{ width: '95%', marginTop: 10 }}>
            <AppButton onPress={onSubmit} title={'Continue'} disabled={false} />
          </View>
        </View>

      </View>
    )
  }
  const Heading = () => {
    return (

      <View
        style={{
          paddingTop: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          testID='btnBack'
          style={[styles.modalButton, { flex: 1, justifyContent: 'flex-start' }]}
          onPress={() =>  back()}>
          <Icon
            testID='iconBack'
            name="chevron-back"
            color={Colors.FrenchRose}
            size={24}
          />
          <Text style={{fontSize:16, color:Colors.FrenchRose, textAlign:'center'}}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.mediumHeaderText, { flex: 2.5, color:Colors.FrenchRose }]} testID='txtDndHeader'>
             Update Preferences
          </Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={savePreferenceVisiable}>
      <Heading />
      <ScrollView>
        {basicPrefrence()}
      </ScrollView>

    </Modal>
  );
};

export default SavePreference;
