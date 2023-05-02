import React,{useEffect} from "react";
import {MainNav} from './src/navigation/MainNav'
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import Asyncstorage  from '@react-native-async-storage/async-storage'
import { Appearance, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import Colors from './src/styles/colors';
import { GetStyle } from "./src/styles/style-sheet";
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();


export default () => {
  const styles:any=GetStyle();
  const isLightMode= Appearance.getColorScheme() ==='light'?true:false;
  const clearAllData=()=>{
    Asyncstorage.getAllKeys()
    .then(keys => Asyncstorage.multiRemove(keys))
    .then(()=>{});
  }
  useEffect(() =>{
    clearAllData()
  },[])
  let  persistor= persistStore(store);
  return (
    //  <MainNav />
    <Provider  store={store}>
         <PersistGate loading={null} persistor={persistor}>
         {/* <MainNav  />  */}
         <SafeAreaView style={[styles.topSafeArea]} />
            <SafeAreaView style={styles.bottomSafeArea}>
                <StatusBar barStyle="dark-content"  backgroundColor={isLightMode?Colors.White:Colors.Black}  />
                 <MainNav  />                
            </SafeAreaView>              
         </PersistGate>
    </Provider>
  )
}
