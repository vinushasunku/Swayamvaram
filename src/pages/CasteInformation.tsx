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
import {getCasteData, getCasteList} from '../redux/slices/caste';
import TextInputWithIcon from '../components/TextInputWithIcon';
import {useForm} from 'react-hook-form';
import AppModalList from '../components/AppModalList';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void
};

const CasteInformation = ({navigation,updateEnableNext}: WizardProps) => {
  const casteData: any = useAppSelector(getCasteData);
  const casteList: any = useAppSelector(getCasteList);
  const [showCaste, setCasteModel] = React.useState(false);
  const {register, handleSubmit, setValue} = useForm();
  const [selectedCaste, setCaste] = React.useState(null);
  const [option, setOption] = React.useState('');
  const MaritalList: any = useAppSelector(getCasteList);
  const [showMaritalStatus, setMaritalStatusModel] = React.useState(false);
  const [selectedMaritalStatus, setMaritalStatus] = React.useState(null);
  useEffect(() => {
    try {
      casteData.map((item: any, index: any) => register(item.databind));
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
    updateEnableNext(true)
    //validation for form
  }, []);
  function cancelCasteModel() {
    setCasteModel(!showCaste);
  }
  function cancelMaritalStatusModel() {
    setMaritalStatusModel(!showMaritalStatus);
  }
  function SelectedMaritalStatusItem(id: any) {
    console.log('selectitem', id);
    MaritalList.map((item: any) => {
      console.log(item.id);
      if (item.id == id) {
        setMaritalStatus(item.title);
        setValue('maritalStatus', item.title);
        console.log(selectedCaste);
      }
    });
  }
  function SelectedCasteItem(id: any) {
    console.log('selectitem', id);
    casteList.map((item: any) => {
      console.log(item.id);
      if (item.id == id) {
        setCaste(item.title);
        setValue('Caste', item.title);
        console.log(selectedCaste);
      }
    });
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
                value={selectedCaste}
                icon={item.icon}
              />
            );
          }
          if (item.databind === 'maritalstatus') {
            return (
              <TextInputWithIcon
                key={index}
                lable={item.title}
                onPress={setMaritalStatusModel}
                onChangeField={onChangeField}
                dataBind={item.databind}
                value={selectedMaritalStatus}
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
        modaldatalist={MaritalList}
        showReligious={showMaritalStatus}
        cancelModel={cancelMaritalStatusModel}
        option={option}
        onpress={SelectedMaritalStatusItem}
        title={'Marital Status'}
      />
    </View>
  );
};

export default CasteInformation;
