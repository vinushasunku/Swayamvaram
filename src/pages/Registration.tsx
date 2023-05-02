import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions,SafeAreaView} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import PersonalInfo from './PersonalInfo';
import CasteInformation from './CasteInformation';
import LocationInformation from './LocationInformation';
import Education from './Education';
import Family from './FamilyScreen';
import { useAppSelector } from '../redux/hooks';
import Colors from '../styles/colors';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
};
const Registration = ({navigation}: WizardProps) => {
  const [currentPostion, setCurrentPage] = React.useState<number>(0);
  const {width, height} = Dimensions.get('window');
  const [enableNext, setEnableNext] = React.useState<boolean>(true);
  const profileData=useAppSelector(state=>state.loginId.profileData);
  const updateEnableNext = (enable: boolean): void => {
    setEnableNext(true);
  };
  useEffect(() => {
    setEnableNext(true)
    console.log('profiledata',profileData)
    if(profileData.personalDetails === null){
      setCurrentPage(0)
    }
    else if(profileData.regionDetails === null){
      setCurrentPage(1)
    }
    else if(profileData.locationDetails === null){
      setCurrentPage(2)
    }
    else if(profileData.educationDetails === null){
      setCurrentPage(3)
    }
    else if(profileData.professionDetails === null){
      setCurrentPage(4)
    }
    else if(profileData.familyDetails === null){
      setCurrentPage(5)
    }
    navigation.setOptions({
      headerTitle: '',
      headerBackVisible: true,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={setpagination}>
            <Text style={[styles.mediumHeaderText]}>
              {'Already member?Login'}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  useEffect(() => {

  }, [currentPostion]);
  function setpagination() {
    navigation.navigate('LoginPage');
  }

  const labels = [
    'Info',
    'Religion',
    'Location',
    'Education',
    'Family',
    'photo',
  ];
  const renderViewPagerPage = (data: any) => {
    if (data === 'Info') {
      return (
        <PersonalInfo
          navigation={navigation}
          updateEnableNext={updateEnableNext}
        />
      );
    }
    if (data === 'Religion') {
      return <CasteInformation navigation={navigation}  updateEnableNext={updateEnableNext} />;
    }
    if (data === 'Location') {
      return (
        <LocationInformation
          navigation={navigation}
          updateEnableNext={updateEnableNext}
        />
      );
    }
    if(data === 'Education'){
      return (
        <Education
          navigation={navigation}
          updateEnableNext={updateEnableNext}
        />
      );
    }
    if(data === 'Family'){
      return (
        <Family
          navigation={navigation}
          updateEnableNext={updateEnableNext}
        />
      );
    }
  };

  return (
    <ScrollView>
      <View style={{marginLeft: 10, marginRight: 10, marginTop:15}}>
        <View
          style={{width: '100%', alignItems: 'center', flexDirection: 'row'}}>
          {labels.map((item: any, index) => (
            <View key={index} style={{ alignItems: 'center', flexDirection: 'row'}}>
              <View
                key={index}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  backgroundColor:
                    currentPostion > index - 1 ? Colors.FrenchRose : '#aaaaaa',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>{index + 1}</Text>
              </View>
              
              {labels.length - 1 != index ? (
                <View
                  key={index + 'line'}
                  style={{
                    width: width / 12,
                    height: 4,
                    backgroundColor:
                      currentPostion > index ? Colors.FrenchRose : '#aaaaaa',
                  }}></View>
              ) : (
                <></>
              )}
             </View>
          ))}
        </View>
        <View style={{flexDirection: 'row', marginTop: 10, marginBottom:10}}>
          {labels.map((item: any, index) => (
            <Text
              key={index}
              style={{
                fontSize: 13,
                textAlign: 'center',
                fontWeight: '500',
                width: width / 6,
                paddingRight: 5,
                color: currentPostion >= index ? Colors.FrenchRose : '#aaaaaa',
              }}>
              {item}
            </Text>
          ))}
        </View>
        <View style={{marginTop:20,marginBottom:20}}>
        {/* <ScrollView> */}
          {renderViewPagerPage(labels[currentPostion])}
        {/* </ScrollView> */}
        </View>
      </View>
     
        <View style={{height: 50, borderTopWidth: 1, borderColor: 'grey'}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setCurrentPage(currentPostion + 1);
            }}
            style={{marginTop: 10, alignItems: 'flex-end', marginRight: 20}}>
            <Text
              style={[
                styles.mediumHeaderText,
                styles.buttonText,
                {color: '#627D32'},
              ]}>
              {'Next'}
            </Text>
          </TouchableOpacity>
        </View>

     
    </ScrollView>
  );
};

export default Registration;
