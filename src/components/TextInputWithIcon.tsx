import React from 'react';
import {TouchableOpacity, Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GetStyle} from '../styles/style-sheet';

type TextinputiconProps = {
 lable:any
 onPress:any
 onChangeField:any
 dataBind:any
 value:any
 icon:any
  //buttonLink:boolean;
};

export const TextInputWithIcon = ({lable, onPress,onChangeField,dataBind,value,icon}: TextinputiconProps) => {
    console.log('onpress',icon)
  const styles = GetStyle();
  return (
    <View style={{marginTop:10}}>
    <Text style={{ ...styles.mediumHeaderText,paddingBottom:10, textTransform:'uppercase'}}>{lable}</Text>
   

    {/* <TouchableOpacity onPress={() => onPress(true)}> */}
    <View
      style={styles.textInputIconContainer}>
    <TextInput
        style={[{flex: 1},styles.mediumText]}
        value={value}
        pointerEvents="none"
        onTouchStart={()=> onPress(true)}
        editable={false}
        //onChangeText={(searchString) => {this.setState({searchString})}}
        onChangeText={onChangeField(dataBind)}
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity onPress={() => onPress(true)}>
      <Text style={{paddingRight:10}}>
        <Icon name={icon} size={20} color="#000"/>
        </Text>
      </TouchableOpacity>

        </View>
    {/* </TouchableOpacity> */}
    </View>
  

  );
};

export default TextInputWithIcon;
