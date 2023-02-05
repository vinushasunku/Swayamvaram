import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import AppModalList from "../components/AppModalList";
import TextInputWithIcon from "../components/TextInputWithIcon";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import LocationService, { LocationDataDto } from "../services/LocationService";
import {fetchCountrylists,fetchCitylists,fetchStatelists} from '../redux/slices/location';
import { GetStyle } from "../styles/style-sheet";

const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
  updateEnableNext: (arg: boolean) => void
};

const LocationInformation = ({navigation,updateEnableNext}: WizardProps) => {
    const {register, handleSubmit, setValue} = useForm();
    const [showCountry, setCountryModel] = React.useState(false);
    const [showState, setStateModel] = React.useState(false);
    const [showCity, setCityModel] = React.useState(false);
    const dispatch:any=useAppDispatch();
    const countryList=useAppSelector(state=>state.location.countryData);
    const stateList=useAppSelector(state=>state.location.stateList);
    const cityList=useAppSelector(state=>state.location.cityList);
    const locationdata=useAppSelector(state=>state.location.locationData);
    const [option, setOption] = React.useState('');
     const [stateListLoad, setloadStateList] = React.useState(false);
    const [cityListLoad, setloadcityList] = React.useState(false);
    const [pageLoading, setPageLoading] = React.useState(true);
    const accountId=useAppSelector(state=>state.registration.accountId);
    useEffect(()=>{
        setPageLoading(true)
        if(pageLoading){
          dispatch(fetchCountrylists())
          .unwrap()
          .then(()=>{
            setPageLoading(false)
          }).catch((error:any)=>{
            setPageLoading(false)
          })  
        }
      },[pageLoading])
    
      useEffect(()=>{
        console.log('pageloading1',locationdata.country)
        if(stateListLoad){
          dispatch(fetchStatelists(locationdata.country))
          .unwrap()
          .then(()=>{
            setloadStateList(false)
          }).catch((error:any)=>{
            setloadStateList(false)
          })  
        }
      },[stateListLoad])
      useEffect(()=>{
        if(cityListLoad){
          dispatch(fetchCitylists(locationdata))
          .unwrap()
          .then(()=>{
            setloadcityList(false)
          }).catch((error:any)=>{
            setloadcityList(false)
          })  
        }
      },[cityListLoad])
    const onChangeField = useCallback(
        (name: any) => (text: any) => {
          setValue(name, text);
        },
        [],
      );
      function onSubmit(){
        console.log(locationdata)
     LocationService.saveLocationDetail(locationdata,accountId).then((response:any)=>{
          if(response){
             console.log('accountId',response)
              updateEnableNext(true);
          }
      }).catch((error:any)=>{
          console.log('error:',error)})
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
      function SelectedLocationItem(id: any, title:any) {
        if(title === 'Country'){
          countryList.map((item: any) => {
            if (item.name == id) {
                locationdata.country=item.name;   
                setloadStateList(true);
            }
          });
        }
        if(title === 'State'){
          stateList.map((item: any) => {
            if (item.name == id) {
                locationdata.state=item.name;
                setloadcityList(true);
            }
          });
        }
        if(title === 'City'){
          cityList.map((item: any) => {
            if (item.name == id) {
                locationdata.city=item.name;
            }
          });
        }
    
    
      }
    return (
        <View style={{marginBottom:10}}>

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
                onPress={()=>onSubmit()}
                style={[styles.submitButton]}>
                <Text style={[styles.mediumHeaderText, styles.buttonText]}>
                  {'Save'}
                </Text>
              </TouchableOpacity>
            </View>
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
        </View>
      );
}
export default LocationInformation;