
import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import PersonalInfo from './PersonalInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/colors';
import { useAppDispatch } from '../redux/hooks';
import { setEditProfileDetailInfo } from '../redux/slices/login';
const styles: any = GetStyle();
type WizardProps = {
  profileEditVisiable: any;
  editType:any;
  navigation:any;
};
export const ProfileEdit=({profileEditVisiable,editType, navigation}:WizardProps)=>{
    const dispatch: any = useAppDispatch();
    const updateEnableNext = (enable: boolean): void => {
      };
      function back(){
        dispatch(setEditProfileDetailInfo(false))
      }
      const Heading=()=>{
        return(
            <View style={{paddingTop:10, flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
  <TouchableOpacity
                      style={[{ flex:1, justifyContent:'flex-start', flexDirection:'row',alignContent:'center', height:40, width:'100%'}]}
                      onPress={() => {
                       back()
                      }}>
                      <Icon
                        name={'chevron-back'}
                        size={35}
                        color={Colors.FrenchRose}
                      />
                      <Text style={{fontSize:16, textAlign:'center'} }>Back</Text>
                    </TouchableOpacity>
            </View>
        )
      }
 return (
    <Modal
    animationType='slide'
    presentationStyle='formSheet'
    visible={profileEditVisiable}

    >
<Heading />
          <PersonalInfo
          navigation={navigation}
          updateEnableNext={updateEnableNext}
        />
     
    </Modal>
 )
}

export default ProfileEdit;