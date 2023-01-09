import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import SafeAreaView from "react-native-safe-area-view";

const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
};

const HomeScreen = ({navigation}: WizardProps) => {



  return (
<SafeAreaView  style={{ flex: 1}}>

{/* <StatusBar  translucent
            backgroundColor="#5E8D48"
            barStyle="light-content"/> */}
    <View style={{ flex: 1, backgroundColor: 'white'}}>
     <Text>   {'Test'}</Text>
    </View>
</SafeAreaView>

  );
};

export default HomeScreen;
