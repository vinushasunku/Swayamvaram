import React, {useEffect, useCallback} from 'react';
import {View, Text, StatusBar, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import SafeAreaView from 'react-native-safe-area-view';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/colors';
const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
};

const AccountProfile = ({navigation}: WizardProps) => {
  const accountProfiledetail = useAppSelector(
    state => state.loginId.profileData,
  );
  const profilePicture = () => {
    return (
      <View>
        <ImageBackground
          style={{
            width: '100%',
            aspectRatio: 1.6,
            borderWidth: 1,
            //borderRadius: 5,
            //borderTopEndRadius: 5,
          }}
          resizeMode="cover"
          source={{
            uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg',
          }}></ImageBackground>
        <View
          style={{
            top: -20,
            height: 150,
            width: '95%',
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: '#aaa',
            backgroundColor: 'white',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <View style={{width: '50%', marginTop: 10, marginLeft: 10}}>
            <Image
              source={{
                uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg',
              }}
              style={{height: 130}}
            />
          </View>
          <View style={{alignItems: 'center', paddingTop: 10}}>
            <Text style={[styles.mediumHeaderText, {paddingLeft: 10}]}>
              {accountProfiledetail.personalDetails.firstName +
                ' ' +
                accountProfiledetail.personalDetails.lastName}
            </Text>
            <Text style={[styles.mediumHeaderText, {paddingLeft: 10}]}>
              {accountProfiledetail.personalDetails.gender}
            </Text>
          </View>
        </View>
      </View>
    );
  };
 function navigateprofile(){
   //navigation.navigate('Matches',{screen:'ProfileDetail'})
 }
  const iconAction=()=>{
    return(
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity
                style={[
                  //styles.submitButton,
                  {marginTop: 10,  alignItems: 'center',marginLeft:'2%'},
                ]}
                onPress={() => {
                   
                }}>
                <View style={{alignItems:'center'}}>
                 <View style={[styles.circleicon]}>
                     <Icon name={'thumbs-up-outline'} size={35} color={Colors.FrenchRose}/>
                    </View>   
               
                <Text style={[styles.mediumHeaderText,{paddingTop:10}]}>{'Shortlisted '}</Text>
                </View>    
            
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  //styles.submitButton,
                  {marginTop: 10,  alignItems: 'center',marginLeft:'2%'},
                ]}
                onPress={() => {
                    //navigation.navigate('ProfileDetail',{edit:true})
                    navigateprofile()
                }}>
                <View style={{alignItems:'center'}}>
                 <View style={[styles.circleicon]}>
                     <Icon name={'pencil-outline'} size={35} color={Colors.FrenchRose}/>
                    </View>   
               
                <Text style={[styles.mediumHeaderText,{paddingTop:10}]}>{'Edit Profile '}</Text>
                </View>    
            
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  //styles.submitButton,
                  {marginTop: 10,  alignItems: 'center',marginLeft:'2%'},
                ]}
                onPress={() => {
                   
                }}>
                <View style={{alignItems:'center'}}>
                 <View style={[styles.circleicon]}>
                     <Icon name={'settings-outline'} size={35} color={Colors.FrenchRose}/>
                    </View>   
               
                <Text style={[styles.mediumHeaderText,{paddingTop:10}]}>{'Edit Preferences '}</Text>
                </View>    
            
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  //styles.submitButton,
                  {marginTop: 10,  alignItems: 'center',marginLeft:'2%'},
                ]}
                onPress={() => {

                }}>
                <View style={{alignItems:'center'}}>
                 <View style={[styles.circleicon]}>
                     <Icon name={'chatbubble-ellipses-outline'} size={35} color={Colors.FrenchRose}/>
                    </View>   
               
                <Text style={[styles.mediumHeaderText,{paddingTop:10}]}>{'Chat '}</Text>
                </View>    
            
              </TouchableOpacity>
        </View>
    )
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {profilePicture()}
        {iconAction()}
      </View>
    </SafeAreaView>
  );
};

export default AccountProfile;
