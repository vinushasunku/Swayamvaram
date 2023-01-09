import React, {useEffect,useRef,useState} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import {GetStyle} from '../styles/style-sheet'
import AppButton from '../components/AppButton'
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import login, { setLoginId,setPaginationId } from "../redux/slices/login";

import Registration from './Registration'
const style:any=GetStyle();
const LoginPage=({navigation}:any)=>{
    const dispatch = useAppDispatch();
    const[inLoginPage, setInLoginPage]=React.useState(false);
    //const currentpagination=useAppSelector(state => state.loginId.pagination);
    const styles=GetStyle();
    useEffect(() => {
        setInLoginPage(false);
        console.log(inLoginPage)
        navigation.setOptions({          
            headerRight: () => (
                <TouchableOpacity
                //style={[styles.submitButton]}
               onPress={setpagination}
                >
                 <Text style={[styles.buttonHeaderText]}>{"REGISTER NOW"}</Text>
                </TouchableOpacity>
              ),
        });
      }, [navigation]);
      function signupButton() {
        //navigation.navigate('Signup')
        dispatch(setLoginId("12345678"));
    }
    function setpagination(){
       navigation.navigate('Registration')
      
    }
    return(
        <View style={{flex:1}}>
              
              <View style={{ marginLeft:10, marginRight:10}}>
                  <AppButton onPress={signupButton} title={'Login'} disabled={false} />
            </View>
                
        </View>
    )
}
LoginPage.navigationOption =  {
    // return {       
    //     header: () => null
    // }
    title: 'Login',
    headerTitleAlign: 'center',
    headerTintColor: 'black',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor:'white'
    }
}
export default LoginPage;