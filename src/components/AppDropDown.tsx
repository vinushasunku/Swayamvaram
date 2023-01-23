import React from 'react';
import {Text,View} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import {GetStyle} from '../styles/style-sheet'


type ButtonProps={
    gender:any;
    value:any;
    //disabled:boolean;
    onSelection:any;
    label:any
    //buttonLink:boolean;
}

export const AppDropDown=({gender,value,onSelection,label}:ButtonProps)=>{
 const styles=GetStyle();
 return(
    <View style={{ flexDirection: 'row', alignItems: 'center',width:'95%' }}>
    <Text style={{ ...styles.mediumHeaderText,paddingBottom:10,width:'20%', textTransform:'uppercase'}}>
    {label}
    </Text>
    <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.mediumText}
            selectedTextStyle={styles.mediumText}
            inputSearchStyle={styles.mediumText}
            iconStyle={{ width: 20,
                height: 20}}
            //itemTextStyle={{textColor:'blue'}}
            itemTextStyle={{fontWeight:'600', color:'black'}}
            textColor="black"
            data={gender}
            //search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                onSelection(item.label);
            }}
        />
 </View>

 )
};

export default AppDropDown;
