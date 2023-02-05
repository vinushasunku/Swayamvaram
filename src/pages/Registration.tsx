import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {ScrollView} from 'react-native-gesture-handler';
//import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import PersonalInfo from './PersonalInfo';
import CasteInformation from './CasteInformation';
import LocationInformation from './LocationInformation';
import StepIndicator from 'react-native-step-indicator';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
};
const Registration = ({navigation}: WizardProps) => {
  const [currentPostion, setCurrentPage] = React.useState<number>(0);
  const {width, height} = Dimensions.get('window');
  const [enableNext, setEnableNext] = React.useState<boolean>(true);
  const updateEnableNext = (enable: boolean): void => {
    setEnableNext(true);
  };
  useEffect(() => {
    setEnableNext(true)
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
  useEffect(() => {}, [currentPostion]);
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
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
    borderRadiusSize: 10,
  };
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
  };

  return (
    <View style={[styles.container, {marginTop: 10}]}>
      <View style={{marginLeft: 10, marginRight: 10}}>
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
                    currentPostion > index - 1 ? '#fe7013' : '#aaaaaa',
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
                      currentPostion > index ? '#fe7013' : '#aaaaaa',
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
                color: currentPostion > index ? '#fe7013' : '#aaaaaa',
              }}>
              {item}
            </Text>
          ))}
        </View>
        <ScrollView>{renderViewPagerPage(labels[currentPostion])}</ScrollView>
      </View>
      {enableNext ? (
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
      ) : (
        <></>
      )}
    </View>
  );
};

export default Registration;
