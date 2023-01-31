import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getCasteData, getCasteList,fetchReligionlists, setCasteData, fetchCastelists, fetchSubCastelists} from '../redux/slices/caste';
import TextInputWithIcon from '../components/TextInputWithIcon';
import {useForm} from 'react-hook-form';
import AppModalList from '../components/AppModalList';
import CasteService, { CasteInfoDto } from '../services/CasteService';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void
};

const CasteInformation = ({navigation,updateEnableNext}: WizardProps) => {
  const casteData: any = useAppSelector(getCasteData);
  //const casteList: any = useAppSelector(getCasteList);
  const [showCaste, setCasteModel] = React.useState(false);
  const [showReligion, setReligionModel] = React.useState(false);
  const [showMaritalStatus, setMaritalStatusModel] = React.useState(false);
  const {register, handleSubmit, setValue} = useForm();
  const [option, setOption] = React.useState('');

  const dispatch:any=useAppDispatch();
  const religionList=useAppSelector(state=>state.religion.religionData);
  const casteList=useAppSelector(state=>state.religion.casteList);
  const subcasteList=useAppSelector(state=>state.religion.subCasteList);
  const religiondata=useAppSelector(state=>state.religion.casteData);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [casteListLoad, setloadCasteList] = React.useState(false);
  const [subcasteListLoad, setloadSubCasteList] = React.useState(false);
  const accountId=useAppSelector(state=>state.registration.accountId);
  
  useEffect(() => {
    try {
      casteData.map((item: any, index: any) => register(item.databind));
      console.log('acccountid',accountId)
    } catch (error) {
    }
  }, [navigation]);

  useEffect(()=>{
    if(pageLoading){
      dispatch(fetchReligionlists())
      .unwrap()
      .then(()=>{
        setPageLoading(false)
      }).catch((error:any)=>{
        setPageLoading(false)
      })  
    }
  },[pageLoading])

  useEffect(()=>{
    if(casteListLoad){
      dispatch(fetchCastelists(religiondata.religion))
      .unwrap()
      .then(()=>{
        setloadCasteList(false)
      }).catch((error:any)=>{
        setloadCasteList(false)
      })  
    }
  },[casteListLoad])
  useEffect(()=>{
    if(subcasteListLoad){
      dispatch(fetchSubCastelists(religiondata))
      .unwrap()
      .then(()=>{
        setloadSubCasteList(false)
      }).catch((error:any)=>{
        setloadSubCasteList(false)
      })  
    }
  },[subcasteListLoad])
  const onChangeField = useCallback(
    (name: any) => (text: any) => {
      setValue(name, text);
    },
    [],
  );
  const onSubmit = useCallback((formData: CasteInfoDto) => {
    console.log(religiondata)
    CasteService.saveReligionDetail(religiondata,accountId).then((response:any)=>{
      if(response){
         console.log('accountId',response.data)
          updateEnableNext(true);
      }
  }).catch((error:any)=>{
      console.log('error:',error)})
    updateEnableNext(true)
    //validation for form
  }, []);
  function cancelCasteModel() {
    setCasteModel(!showCaste);
  }
  function cancelReligionModel() {
    setReligionModel(!showReligion);
  }
  function cancelMaritalStatusModel() {
    setMaritalStatusModel(!showMaritalStatus);
  }

  function SelectedCasteItem(id: any, title:any) {
    if(title === 'Religion'){
      religionList.map((item: any) => {
        if (item.id == id) {
            religiondata.religion=item.name;
            setloadCasteList(true)    
          dispatch(setCasteData(religiondata))
        }
      });
    }
    if(title === 'Caste'){
      casteList.map((item: any) => {
        if (item.id == id) {
            religiondata.caste=item.name;
            setloadCasteList(true)
            setloadSubCasteList(true)
        }
      });
    }
    if(title === 'Sub Caste'){
      subcasteList.map((item: any) => {
        if (item.id == id) {
            religiondata.subCaste=item.name;
            setloadSubCasteList(true)
        }
      });
    }


  }
  return (
    <View style={{marginBottom:10}}>
      {casteData.map((item: any, index: any) => {
        if (item.textIcon === true) {
          if (item.databind === 'caste') {
            return (
              <TextInputWithIcon
                key={index}
                lable={item.title}
                onPress={setCasteModel}
                onChangeField={onChangeField}
                dataBind={item.databind}
                value={religiondata.caste}
                icon={item.icon}
              />
            );
          }
          if (item.databind === 'religion') {
            return (
              <TextInputWithIcon
                key={index}
                lable={item.title}
                onPress={setReligionModel}
                onChangeField={onChangeField}
                dataBind={item.databind}
                value={religiondata.religion}
                icon={item.icon}
              />
            );
          }
          if (item.databind === 'subcaste') {
            return (
              <TextInputWithIcon
                key={index}
                lable={item.title}
                onPress={setMaritalStatusModel}
                onChangeField={onChangeField}
                dataBind={item.databind}
                value={religiondata.subCaste}
                icon={item.icon}
              />
            );
          }
        }
      })}

<View
          style={{
            //borderRadius: 1,
            height: '10%',
            //borderTopWidth: 1,
            width: '100%',
            flexDirection:'row'
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
      <AppModalList
        modaldatalist={casteList}
        showReligious={showCaste}
        cancelModel={cancelCasteModel}
        option={option}
        onpress={SelectedCasteItem}
        title={'Caste'}
      />
        <AppModalList
        modaldatalist={religionList}
        showReligious={showReligion}
        cancelModel={cancelReligionModel}
        option={option}
        onpress={SelectedCasteItem}
        title={'Religion'}
      />
      <AppModalList
        modaldatalist={subcasteList}
        showReligious={showMaritalStatus}
        cancelModel={cancelMaritalStatusModel}
        option={option}
        onpress={SelectedCasteItem}
        title={'Sub Caste'}
      />
    </View>
  );
};

export default CasteInformation;
