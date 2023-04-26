import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Modal, TextInput} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/colors';
import {useAppDispatch} from '../redux/hooks';
import {setEditProfileDetailInfo} from '../redux/slices/login';
import { Age, ListDropDownDto, PrefrenceDataDto, Salary } from '../services/MatchesService';
import AppDropDown from '../components/AppDropDown';
import TextInputWithIcon from '../components/TextInputWithIcon';
import MultiSelectionList from '../components/MultiSelectionList';

  const dbCurrency = [
    {label: 'USD', value: 'USD'},
    {label: 'INR', value: 'INR'},
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
        subCastes:[],
        profession: []
    };
  }
  function createDropDownList():ListDropDownDto[]{
   return[
    {name: 'STUDENT_VISA', id: 'STUDENT_VISA', hasNextLevel:'',
    nextLevelName:''},
    {name: 'STUDENT_WORK_VISA', id: 'STUDENT_WORK_VISA', hasNextLevel:'',
    nextLevelName:''},
    {name: 'WORK_VISA', id: 'WORK_VISA', hasNextLevel:'',
    nextLevelName:''},
    {name: 'PR', id: 'PR', hasNextLevel:'',
    nextLevelName:''}
   ]
}
function createEmploymentList():ListDropDownDto[]{
    return[
        {id: 'STUDYING', name: 'STUDYING',hasNextLevel:'',
        nextLevelName:''},
        {id: 'BUSINESS', name: 'BUSINESS',hasNextLevel:'',
        nextLevelName:''},
        {id: 'GOVERNMENT', name: 'GOVERNMENT',hasNextLevel:'',
        nextLevelName:''},
        {id: 'PRIVATE', name: 'PRIVATE',hasNextLevel:'',
        nextLevelName:''},
    ]
 }
function createAge(): Age {
  return{
    min: 0,
    max: 0
  }
  }

function createSalary(): Salary {
    return{
      min: 0,
      max: 0
    }
    }

//   const [agelist, setageList]=useState(CreateAgeList());
  function SelectedModelItem(id: any, title: any) {
    if (title === 'Visa') {
      listVisaStatus.map((item: any) => {
        if (item.name == id) {
          var newprefrenceData={...prefrenceData}
          newprefrenceData.visaStatus = [...newprefrenceData.visaStatus,item.name];
          setPrefrencedata(newprefrenceData)
          //setShowVisaModel(!showVisaModal);
          //setLoadYearList(!loadYear)
        }
      });
    }

    if (title === 'Employment') {
        listEmployment.map((item: any) => {
          if (item.name == id) {
            var newprefrenceData={...prefrenceData}
            newprefrenceData.employment = [...newprefrenceData.employment,item.name];
            setPrefrencedata(newprefrenceData)
            //setShowVisaModel(!showVisaModal);
            //setLoadYearList(!loadYear)
          }
        });
      }
  }
  function back() {
    dispatch(setEditProfileDetailInfo(false));
  }
  function setCurrencydata(label: any) {
    var newprefrencessdata={...prefrenceData}
    newprefrencessdata.salaryCurrency = label;
    setPrefrencedata(newprefrencessdata)
  }
  function cancelVisaModel(){
    setShowVisaModel(false)
  }
  function cancelEmploymentModel(){
    setShowEmploymentModel(false)
  }
  function basicPrefrence(){
    return(
        <View>
          <Text style={[styles.mediumHeaderText]}>Age</Text>
          <View style={{flexDirection:'row'}}>
          <TextInput
        placeholderTextColor="#2F4F4F"
         style={[styles.mediumText, {borderColor:'grey', borderWidth:1, width:'40%', height:40}]}
        editable={true}
        value={prefrenceData.age.min.toString()}
        //onChangeText={(value) => onChangeText(databind,value)}
      />
        <Icon name={'remove-outline'} size={24} color={Colors.Grey} style={{marginLeft:10, marginRight:10}} />
           <TextInput
        placeholderTextColor="#2F4F4F"
         style={[styles.mediumText,{borderColor:'grey', borderWidth:1, width:'40%', height:40}]}
        editable={true}
        value={prefrenceData.age.max.toString()}
        //onChangeText={(value) => onChangeText(databind,value)}
      />
          </View>
          <Text style={[styles.mediumHeaderText]}>{'Salary'}</Text>
          <View style={{flexDirection:'row'}}>
          <TextInput
        placeholderTextColor="#2F4F4F"
         style={[styles.mediumText, {borderColor:'grey', borderWidth:1, width:'40%', height:40}]}
        editable={true}
        value={prefrenceData.salary.min.toString()}
        //onChangeText={(value) => onChangeText(databind,value)}
      />
        <Icon name={'remove-outline'} size={24} color={Colors.Grey} style={{marginLeft:10, marginRight:10}} />
           <TextInput
        placeholderTextColor="#2F4F4F"
         style={[styles.mediumText,{borderColor:'grey', borderWidth:1, width:'40%', height:40}]}
        editable={true}
        value={prefrenceData.salary.max.toString()}
        //onChangeText={(value) => onChangeText(databind,value)}
      />
          </View>
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
        </View>
    )
  }
  const Heading = () => {
    return (
      <View
        style={{
          paddingTop: 10,
          flexDirection: 'row',
          //   justifyContent: 'center',
          //   alignContent: 'center',
        }}>
        <View style={{height: 40, width: '30%'}}>
          <TouchableOpacity
            style={[
              {
                flex: 1,
                justifyContent: 'flex-start',

                //width: '100%',
              },
            ]}
            onPress={() => {
              back();
            }}>
            <View style={{flexDirection: 'row', alignContent: 'center'}}>
              <Icon name={'chevron-back'} size={35} color={Colors.FrenchRose} />
              <Text style={{fontSize: 16, textAlign: 'center'}}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.mediumHeaderText}>{'Update Preferences'}</Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={savePreferenceVisiable}>
      <Heading />
      {basicPrefrence()}
    </Modal>
  );
};

export default SavePreference;
