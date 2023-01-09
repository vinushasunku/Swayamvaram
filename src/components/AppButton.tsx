import React from 'react';
import {TouchableOpacity,Text,View} from 'react-native'
import {GetStyle} from '../styles/style-sheet'


type ButtonProps={
    onPress:any;
    title:string;
    disabled:boolean;
    //buttonLink:boolean;
}

export const AppButton=({onPress,title,disabled}:ButtonProps)=>{
 const styles=GetStyle();
 return(
    // <View style={styles.submitButton}>
    <TouchableOpacity
    disabled={disabled}
    style={[styles.submitButton,{marginTop:10}]}
    onPress={onPress}
    >
     <Text style={[styles.buttonText]}>{title}</Text>
    </TouchableOpacity>
    // </View>

 )
};

export default AppButton;
