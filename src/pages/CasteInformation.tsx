import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getCasteData, getCasteList,fetchReligionlists, setCasteData, fetchCastelists, fetchSubCastelists, getReligion, createCaste} from '../redux/slices/caste';
import TextInputWithIcon from '../components/TextInputWithIcon';
import {useForm} from 'react-hook-form';
import AppModalList from '../components/AppModalList';
import CasteService, { CasteInfoDto } from '../services/CasteService';
import AppButton from '../components/AppButton';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void
};

const CasteInformation = ({navigation,updateEnableNext}: WizardProps) => {
  //const casteList: any = useAppSelector(getCasteList);
  const [showCaste, setCasteModel] = React.useState(false);
  const [showReligion, setReligionModel] = React.useState(false);
  const [showMaritalStatus, setMaritalStatusModel] = React.useState(false);
  const [option, setOption] = React.useState('');

  const dispatch:any=useAppDispatch();
  const religionList=useAppSelector(state=>state.religion.religionData);
  const casteList=useAppSelector(state=>state.religion.casteList);
  const subcasteList=useAppSelector(state=>state.religion.subCasteList);
  //const religiondata=useAppSelector(state=>state.religion.casteData);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [casteListLoad, setloadCasteList] = React.useState(false);
  const [subcasteListLoad, setloadSubCasteList] = React.useState(false);
  const accountId=useAppSelector(state=>state.registration.accountId);

  const profile=useAppSelector(state=>state.loginId.profileData);
  const [religiondata, setCastedata] = React.useState(createCaste());
  const [intialpageLoad, setintialpageLoad] = React.useState(true);
  
  useEffect(() => {
    try {
      console.log('acccountid',accountId)
      if(intialpageLoad)
      {
      setCastedata(profile.religionDetails)
      if(profile.religionDetails.religion != null){
        console.log('loadcaste')
        setloadCasteList(true)
      }
      if(profile.religionDetails.caste != null){
        console.log('loadcaste')
        setloadSubCasteList(true)
      }
      setintialpageLoad(false)
    }
      updateEnableNext(false);
      setPageLoading(true);
    } catch (error) {
    }
  }, [navigation]);

  useEffect(()=>{
    console.log(pageLoading)
    if(pageLoading){
      dispatch(fetchReligionlists())
      .unwrap()
      .then(()=>{
        console.log('religion',religionList)
        setPageLoading(false)
      }).catch((error:any)=>{
        setPageLoading(false)
      })  
    }
  },[pageLoading])

  useEffect(()=>{
    if(casteListLoad){
      console.log('loadcaste2',religiondata.religion)
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

  function onSubmit(){
    CasteService.saveReligionDetail(religiondata,accountId).then((response:any)=>{
      if(response){
         console.log('accountId',response)
          updateEnableNext(true);
      }
  }).catch((error:any)=>{
      console.log('error:',error)})
    updateEnableNext(true)
  }

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
        if (item.name == id) {
            religiondata.religion=item.name;
            setloadCasteList(true)    
          dispatch(setCasteData(religiondata))
        }
      });
    }
    if(title === 'Caste'){
      casteList.map((item: any) => {
        if (item.name == id) {
            religiondata.caste=item.name;
            setloadCasteList(true)
            setloadSubCasteList(true)
        }
      });
    }
    if(title === 'Sub Caste'){
      subcasteList.map((item: any) => {
        if (item.name == id) {         
            religiondata.subCaste=item.name;
            setloadSubCasteList(true)
        }
      });
    }


  }
  return (
    <View style={{marginBottom:10, marginLeft:10}}>

               <TextInputWithIcon
                lable={'Religion'}
                onPress={setReligionModel}
                dataBind={'religion'}
                value={religiondata.religion}
                icon={'chevron-forward-outline'}
              />
              <TextInputWithIcon
                lable={'Caste'}
                onPress={setCasteModel}
                dataBind={'caste'}
                value={religiondata.caste}
                icon={'chevron-forward-outline'}
              />
               <TextInputWithIcon
                lable={'Sub Caste'}
                onPress={setMaritalStatusModel}
                dataBind={'subCaste'}
                value={religiondata.subCaste}
                icon={'chevron-forward-outline'}
              />
<View style={{width:'95%', marginTop:10}}>
<AppButton onPress={onSubmit} title={'Continue'} disabled={false} />
</View>

{/* <View
          style={{
            //borderRadius: 1,
            height: '10%',
            //borderTopWidth: 1,
            width: '100%',
            flexDirection:'row'
          }}>
        
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={()=>onSubmit()}
            style={[styles.submitButton]}>
            <Text style={[styles.mediumHeaderText, styles.buttonText]}>
              {'Save'}
            </Text>
          </TouchableOpacity> 
        </View> */}
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
