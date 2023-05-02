import React from 'react';
import {TextInput, Text, View} from 'react-native';
import {GetStyle} from '../styles/style-sheet';

type ButtonProps = {
  onChangeText: any;
  //placeholder:string;
  onFocus: any;
  value: string;
  lable:any;
  databind:any
};

export const AppTextInput = ({
  //value,
  onChangeText,
  onFocus,
  value,
  lable,
  databind
}: ButtonProps) => {
  const styles = GetStyle();
  return (
    <View style={{width:'95%',marginLeft:10}}>
      <Text
        style={{
          ...styles.mediumHeaderText,
        }}>
        {lable}
      </Text>
      <TextInput
        placeholderTextColor="#2F4F4F"
         style={[styles.mediumText,styles.textInput]}
        editable={true}
        value={value}
        onChangeText={(value) => onChangeText(databind,value)}
      />
    </View>

  );
};

export default AppTextInput;
