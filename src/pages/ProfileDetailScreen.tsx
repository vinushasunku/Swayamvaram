import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  StatusBar,useWindowDimensions
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import SafeAreaView from "react-native-safe-area-view";
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import { fetchProfiledetail } from '../redux/slices/matches';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
};

const ProfileDetailScreen = ({navigation}: WizardProps) => {
  const accountId=useAppSelector(state=>state.registration.accountId);
  const selectProfileId=useAppSelector(state=>state.matches.selectedProfileId);
  const profileDetail=useAppSelector(state=>state.matches.profileDetail);
  const [doneLoading, setStatusLoading] = useState(false);
  const dispatch:any=useAppDispatch();
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal" component={PersonalInfoRoute} />
      <Tab.Screen name="Religious" component={ReligiousInfoRoute} />
      <Tab.Screen name="Professional" component={ProfessionalInfoRoute} />
    </Tab.Navigator>
  );
}
  useEffect(() => {
    console.log('select profile', selectProfileId)
    if(selectProfileId.selectedProfileId != ''){
      dispatch(fetchProfiledetail(selectProfileId))
      .unwrap()
      .then((response:any)=>{
        console.log('profiledeatil',profileDetail)
        setStatusLoading(true);
      }).catch((error:any)=>{
        console.log('get matches list',error)
      })  
    } 
  }, [doneLoading]);
  return (
<SafeAreaView  style={{ flex: 1}}>
    <View style={{ flex: 1, backgroundColor: 'white'}}>
{MyTabs()}
    </View>
</SafeAreaView>

  );
};
const PersonalInfoRoute = () => {
  const profileDetail=useAppSelector(state=>state.matches.profileDetail)
  return(
  <View style={{ flex: 1,backgroundColor: 'white',paddingLeft:20 }}>
    <Text style={[styles.mediumHeaderText,{paddingTop:20, fontSize:20}]}>{'Personal Information'}</Text>
    <View style={{borderWidth:1, borderColor:'grey', marginRight:10 , paddingBottom:20, borderRadius:10, paddingLeft:20}}>
    <Text style={[styles.mediumHeaderText,{paddingTop:20, fontSize:20}]}>{'Basic Detail'}</Text>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'First Name'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.personalDetails?.firstName != null ?profileDetail?.personalDetails?.firstName:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Last Name'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.personalDetails?.lastName != null ?profileDetail?.personalDetails?.lastName:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Gender'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{ profileDetail?.personalDetails?.gender != null ?profileDetail?.personalDetails?.gender:'No Information' }</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Phone number'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{ profileDetail?.personalDetails?.mobileNumber != null ?'+'+profileDetail?.personalDetails?.countryCode+profileDetail?.personalDetails?.mobileNumber:'No Information' }</Text>
     </View>
    </View>
    <View style={{borderWidth:1, borderColor:'grey', marginRight:10 , paddingBottom:20, borderRadius:10, paddingLeft:20}}>
    <Text style={[styles.mediumHeaderText,{paddingTop:20, fontSize:20}]}>{'Family Details'}</Text>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Father Name'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.familyDetails?.fatherName != null ?profileDetail?.familyDetails.fatherName:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Mother Name'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.familyDetails?.motherName != null ?profileDetail?.familyDetails?.motherName:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Brother'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{ profileDetail?.familyDetails?.motherName != null ?profileDetail?.familyDetails?.motherName:'No Information' }</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Sister'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{ profileDetail?.familyDetails?.sisters != null ?profileDetail?.familyDetails?.sisters:'No Information' }</Text>
     </View>
    </View>
  </View>
  )
};

const ReligiousInfoRoute = () => {
  const profileDetail=useAppSelector(state=>state.matches.profileDetail)
  return(
  <View style={{ flex: 1,backgroundColor: 'white',paddingLeft:20 }}>
    <Text style={[styles.mediumHeaderText,{paddingTop:20, fontSize:20}]}>{'Religious/Location Information'}</Text>
    <View style={{borderWidth:1, borderColor:'grey', marginRight:10 , paddingBottom:20, borderRadius:10, paddingLeft:20}}>
    <Text style={[styles.mediumHeaderText,{paddingTop:20, fontSize:20}]}>{'Caste Detail'}</Text>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'religion'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.regionDetails?.religion != null ?profileDetail?.regionDetails?.religion:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Caste'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.regionDetails?.caste != null ?profileDetail?.regionDetails?.caste:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Sub Caste'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{ profileDetail?.regionDetails?.subCaste != null ?profileDetail?.regionDetails?.caste:'No Information' }</Text>
     </View>
    </View>
    <View style={{borderWidth:1, borderColor:'grey', marginRight:10 , paddingBottom:20, borderRadius:10, paddingLeft:20}}>
    <Text style={[styles.mediumHeaderText,{paddingTop:20, fontSize:20}]}>{'Location Details'}</Text>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Country'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.locationDetails?.country != null ?profileDetail?.locationDetails.country:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'State'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.locationDetails?.state != null ?profileDetail?.locationDetails?.state:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'City'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{ profileDetail?.locationDetails?.city != null ?profileDetail?.locationDetails?.city:'No Information' }</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Citizenship'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{ profileDetail?.locationDetails?.citizenship != null ?profileDetail?.locationDetails?.citizenship:'No Information' }</Text>
     </View>
    </View>

    <View style={{borderWidth:1, borderColor:'grey', marginRight:10 , paddingBottom:20, borderRadius:10, paddingLeft:20}}>
    <Text style={[styles.mediumHeaderText,{paddingTop:20, fontSize:20}]}>{'Visa Information'}</Text>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Visa Status'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.locationDetails?.visaStatus != null ?profileDetail?.locationDetails.visaStatus:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Visa Expiry'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.locationDetails?.visaExpiryYear != null && profileDetail?.locationDetails?.visaExpiryMonth?profileDetail?.locationDetails?.visaExpiryMonth +'/'+profileDetail?.locationDetails?.visaExpiryYear:'No Information'}</Text>
     </View>

    </View>
  </View>
  )
};

const ProfessionalInfoRoute = () => {
  const profileDetail=useAppSelector(state=>state.matches.profileDetail)
  return(
  <View style={{ flex: 1,backgroundColor: 'white',paddingLeft:20 }}>
    <Text style={[styles.mediumHeaderText,{paddingTop:20, fontSize:20}]}>{'Professional Information'}</Text>
    <View style={{borderWidth:1, borderColor:'grey', marginRight:10 , paddingBottom:20, borderRadius:10, paddingLeft:20}}>
    <Text style={[styles.mediumHeaderText,{paddingTop:20, fontSize:20}]}>{'Basic Detail'}</Text>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Employment'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.professionDetails?.employment != null ?profileDetail?.professionDetails?.employment:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Profession'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.professionDetails?.profession != null ?profileDetail?.professionDetails?.profession:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Company'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{ profileDetail?.professionDetails?.company != null ?profileDetail?.professionDetails?.company:'No Information' }</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'salary'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{ profileDetail?.professionDetails?.salary != null ?profileDetail?.professionDetails?.currency+' '+profileDetail?.professionDetails?.salary:'No Information' }</Text>
     </View>
    </View>
    <View style={{borderWidth:1, borderColor:'grey', marginRight:10 , paddingBottom:20, borderRadius:10, paddingLeft:20}}>
    <Text style={[styles.mediumHeaderText,{paddingTop:20, fontSize:20}]}>{'Education Details'}</Text>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Degree'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.educationDetails?.degree != null ?profileDetail?.educationDetails.degree:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Course'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{profileDetail?.educationDetails?.course != null ?profileDetail?.educationDetails?.course:'No Information'}</Text>
     </View>
     <View style={{flexDirection:'row'}}>
      <Text style={[styles.mediumText,{width:'50%'}]}>{'Pass out year'}</Text>
      <Text style={[styles.mediumText,{width:'10%'}]}>{'-'}</Text>
      <Text style={[styles.mediumText]}>{ profileDetail?.educationDetails?.passoutYear != null ?profileDetail?.educationDetails?.passoutYear:'No Information' }</Text>
     </View>
    </View>
  </View>
  )
};

export default ProfileDetailScreen;
