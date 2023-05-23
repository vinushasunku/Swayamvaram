import React from 'react';
import {Text,View, Image} from 'react-native'
import {GetStyle} from '../styles/style-sheet'


type viewProps={
    data:any;
    type:string;
}
export const CommonViewForAction = ({data,type}:viewProps)=>{
    const styles=GetStyle();
    return(
      <View>
        {
          data?.map((item:any)=>(
            <View key={type+item.accountId} style={{flexDirection:'row',borderBottomWidth:0.5, borderColor:'grey', padding:10, margin:10}}>
            <View style={{width: '50%'}}>
                 <Image
                   source={{
                     uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg',
                   }}
                   style={{height: 130}}
                 />
               </View>
               <View style={{padding:10}}>
                 <Text style={[styles.mediumHeaderText]}>
                   {item.firstName +
                     ' ' +
                     item.lastName}
                 </Text>
                 <Text style={[styles.mediumHeaderText]}>
                   {item.age}
                 </Text>
               </View>
          </View>
          ))
        }
  
      </View>
  
    )
  }

  export default CommonViewForAction;