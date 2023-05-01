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
    <View style={{marginTop:10}}>
      <Text
        style={{
          ...styles.mediumHeaderText,
          paddingBottom: 10,
          //textTransform: 'uppercase',
        }}>
        {lable}
      </Text>
      <View style={styles.textInputIconContainer}>
      <TextInput
        placeholderTextColor="#2F4F4F"
         style={[styles.mediumText]}
        editable={true}
        value={value}
        onChangeText={(value) => onChangeText(databind,value)}
      />
      </View>

    </View>
  );
};

export default AppTextInput;
