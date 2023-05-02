import React, {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import AppModalList from '../components/AppModalList';
import TextInputWithIcon from '../components/TextInputWithIcon';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import LocationService, {LocationDataDto} from '../services/LocationService';
import {
  fetchCountrylists,
  fetchCitylists,
  fetchStatelists,
  createLocation,
} from '../redux/slices/location';
import {GetStyle} from '../styles/style-sheet';
import AppDropDown from '../components/AppDropDown';
import AppButton from '../components/AppButton';

const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void;
};

const LocationInformation = ({navigation, updateEnableNext}: WizardProps) => {
  const {register, handleSubmit, setValue} = useForm();
  const [showCountry, setCountryModel] = React.useState(false);
  const [showState, setStateModel] = React.useState(false);
  const [showCity, setCityModel] = React.useState(false);
  const dispatch: any = useAppDispatch();
  const countryList = useAppSelector(state => state.location.countryData);
  const stateList = useAppSelector(state => state.location.stateList);
  const cityList = useAppSelector(state => state.location.cityList);
  //const locationdata = useAppSelector(state => state.location.locationData);
  const [option, setOption] = React.useState('');
  const [stateListLoad, setloadStateList] = React.useState(false);
  const [showCitizenshipModel, setCitizenshipModel] = React.useState(false);
  const [cityListLoad, setloadcityList] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);
  const accountId = useAppSelector(state => state.registration.accountId);

  const profile=useAppSelector(state=>state.loginId.profileData);
  const [locationdata, setLocationdata] = React.useState(createLocation());
  const [intialpageLoad, setintialpageLoad] = React.useState(true);

  const citizenshipList: [LocationDataDto] = [
    {
      id: 'Country',
      name: 'India',
      hasNextLevel: 'true',
      nextLevelName: 'State',
    },
  ];

  const workVisaList = [
    {label: 'STUDENT_VISA', value: '1'},
    {label: 'STUDENT_WORK_VISA', value: '2'},
    {label: 'WORK_VISA', value: '3'},
    {label: 'PR', value: '4'},
  ];

  useEffect(() => {
    try {
      console.log('acccountid',accountId)
      if(intialpageLoad)
      {
        setLocationdata(profile.locationDetails)
      if(profile.locationDetails.country != null){
        setloadStateList(true)
      }
      if(profile.locationDetails.state != null){
        setloadcityList(true)
      }
      setintialpageLoad(false)
    }
    } catch (error) {
    }
  }, [navigation]);

  useEffect(() => {
    setPageLoading(true);
    if (pageLoading) {
      dispatch(fetchCountrylists())
        .unwrap()
        .then(() => {
          setPageLoading(false);
        })
        .catch((error: any) => {
          setPageLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    console.log('pageloading1', locationdata.country);
    if (stateListLoad) {
      dispatch(fetchStatelists(locationdata.country))
        .unwrap()
        .then(() => {
          setloadStateList(false);
        })
        .catch((error: any) => {
          setloadStateList(false);
        });
    }
  }, [stateListLoad]);
  useEffect(() => {
    if (cityListLoad) {
      dispatch(fetchCitylists(locationdata))
        .unwrap()
        .then(() => {
          setloadcityList(false);
        })
        .catch((error: any) => {
          setloadcityList(false);
        });
    }
  }, [cityListLoad]);
  const onChangeField = useCallback(
    (name: any) => (text: any) => {
      setValue(name, text);
    },
    [],
  );
  function onSubmit() {
    console.log(locationdata);
    LocationService.saveLocationDetail(locationdata, accountId)
      .then((response: any) => {
        if (response) {
          console.log('accountId', response);
          updateEnableNext(true);
        }
      })
      .catch((error: any) => {
        console.log('error:', error);
      });
  }

  function cancelCountryModel() {
    setCountryModel(!showCountry);
  }
  function cancelStateModel() {
    setStateModel(!showState);
  }
  function cancelCityModel() {
    setCityModel(!showCity);
  }
  function cancelCitizenModel() {
    setCitizenshipModel(!showCitizenshipModel);
  }
  function SelectedLocationItem(id: any, title: any) {
    if (title === 'Country') {
      countryList.map((item: any) => {
        if (item.name == id) {
          locationdata.country = item.name;
          setloadStateList(true);
        }
      });
    }
    if (title === 'State') {
      stateList.map((item: any) => {
        if (item.name == id) {
          locationdata.state = item.name;
          setloadcityList(true);
        }
      });
    }
    if (title === 'City') {
      cityList.map((item: any) => {
        if (item.name == id) {
          locationdata.city = item.name;
        }
      });
    }
    if (title === 'Citizen') {
      citizenshipList.map((item: any) => {
        if (item.name == id) {
          locationdata.citizenship = item.name;
        }
      });
    }
  }
  function setWorkdata(label: any) {
    locationdata.visaStatus=label;
    //setValue('gender', label);
  }
  return (
    <View style={{marginBottom: 10}}>
      <TextInputWithIcon
        lable={'Country'}
        onPress={setCountryModel}
        //onChangeField={onChangeField}
        dataBind={'country'}
        value={locationdata.country}
        icon={'chevron-forward-outline'}
      />
      <TextInputWithIcon
        lable={'State'}
        onPress={setStateModel}
        //onChangeField={onChangeField}
        dataBind={'state'}
        value={locationdata.state}
        icon={'chevron-forward-outline'}
      />
      <TextInputWithIcon
        lable={'City'}
        onPress={setCityModel}
        //onChangeField={onChangeField}
        dataBind={'city'}
        value={locationdata.city}
        icon={'chevron-forward-outline'}
      />

      <TextInputWithIcon
        lable={'Citizenship'}
        onPress={setCitizenshipModel}
        //onChangeField={onChangeField}
        dataBind={'citizenship'}
        value={locationdata.citizenship}
        icon={'chevron-forward-outline'}
      />
 <AppDropDown
        gender={workVisaList}
        value={locationdata.visaStatus}
        onSelection={setWorkdata}
        label={'Visa Status'}
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
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onSubmit()}
          style={[styles.submitButton]}>
          <Text style={[styles.mediumHeaderText, styles.buttonText]}>
            {'Save'}
          </Text>
        </TouchableOpacity>
      </View> */}
      <AppModalList
        modaldatalist={countryList}
        showReligious={showCountry}
        cancelModel={cancelCountryModel}
        option={option}
        onpress={SelectedLocationItem}
        title={'Country'}
      />
      <AppModalList
        modaldatalist={stateList}
        showReligious={showState}
        cancelModel={cancelStateModel}
        option={option}
        onpress={SelectedLocationItem}
        title={'State'}
      />
      <AppModalList
        modaldatalist={cityList}
        showReligious={showCity}
        cancelModel={cancelCityModel}
        option={option}
        onpress={SelectedLocationItem}
        title={'City'}
      />
      <AppModalList
        modaldatalist={citizenshipList}
        showReligious={showCitizenshipModel}
        cancelModel={cancelCitizenModel}
        option={option}
        onpress={SelectedLocationItem}
        title={'Citizen'}
      />
    </View>
  );
};
export default LocationInformation;
