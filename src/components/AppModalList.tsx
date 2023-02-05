import React from 'react';
import {TouchableOpacity,Text,View, Modal} from 'react-native'
import { ReligionDataDto } from '../services/CasteService';
import { dropdowndata } from '../services/RegistrationService';
import {GetStyle} from '../styles/style-sheet'
import AppButton from './AppButton';


type WizardProps={
    modaldatalist:[ReligionDataDto],
    showReligious:boolean,
    cancelModel:any;
    option:any;
    onpress:any,
    title:any

 }
 export const AppModalList=({modaldatalist,showReligious,cancelModel,option,onpress,title}:WizardProps)=>{
        const styles=GetStyle();
        return(
            <Modal
            animationType='slide'
            visible={showReligious}
            transparent={true}
            > 
                <View style={styles.modelSideContainer}>
                    <View style={styles.modelSideView}>
                        <View
                        style={{
                            paddingTop:20,
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                        >
                            <Text
                            style={{...styles.mediumHeaderText,fontSize:16,paddingBottom:5}}
                            >
                                {title}
                                
                            </Text>
                        
                        </View>
                        <View>
                            {
                                modaldatalist.map((item:ReligionDataDto,index)=>(
                                    <View key={index} style={{ justifyContent: 'center',marginBottom: 10, marginTop: 10,backgroundColor:(option !='' && option== item.id) ?'grey':'white', borderBottomColor:'grey',borderBottomWidth:1}}>
                        
                                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',paddingLeft:10,marginBottom: 10,}}  onPress={()=>{onpress(item.name, title)}}>
                                                <View>
                                                    <Text style={{ ...styles.mediumText }}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                </View> 
                                ))
  
                            }
                        </View>
                     
                        <View style={{marginTop:10}}>
                        <AppButton onPress={cancelModel} title={'Close'} disabled={false} />
                        </View>

                    </View>


                </View>
            </Modal>
        )
    }

export default AppModalList;
