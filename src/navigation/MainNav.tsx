import React, {useEffect} from 'react';
import {
  Appearance,
  TouchableOpacity,
  Button,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  View,
  ScrollView,
} from 'react-native';
import store from '../redux/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../styles/colors';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import LoginPage from '../pages/LoginPage';
import {GetStyle} from '../styles/style-sheet';
import Registration from '../pages/Registration';
import GlobalModal from '../components/GlobalModal';
import HomeScreen from '../pages/HomeScreen';
import MatchesScreen from '../pages/MatchesScreen';
import ProfileDetailScreen from '../pages/ProfileDetailScreen';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {Dimensions} from 'react-native';
import AccountProfile from '../pages/AccountProfile';
import { createProfile } from '../redux/slices/login';
const styles: any = GetStyle();
Icon.loadFont();
const HomeStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const MatchStack = createNativeStackNavigator();
const {width, height} = Dimensions.get('screen');
const isLightMode = Appearance.getColorScheme() === 'light' ? true : false;
function HomeStackNav() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerBackVisible: true,
          headerRight: () => null,
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: Colors.White,
          },
          headerTitleStyle: {
            color: Colors.Black,
          },
        }}
      />
    </HomeStack.Navigator>
  );
}
function MatchStackNav() {
  const profileDetail = useAppSelector(state => state.matches.profileDetail);
  const editBackPage = useAppSelector(state => state.loginId.editProfile);
  const loginprofileDetail = useAppSelector(state => state.loginId.profileData);
 // const [profileDetail, setprofileDetail] = React.useState(createProfile());
  // const dispatch: any = useAppDispatch();
  
  return (
    <MatchStack.Navigator initialRouteName='Match'>
      <MatchStack.Screen
        name="Match"
        component={MatchesScreen}
        options={({route}) => ({
          headerTitle: 'Matches',
          headerShown: true,
          headerBackVisible: false,
          headerRight: () => null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: isLightMode ? Colors.White : Colors.Brand,
          },
          headerTitleStyle: {
            color: Colors.FrenchRose,
          },
        })}
      />
      <MatchStack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          headerTitle: '',
          headerBackVisible: true,
          // headerRight: () => null,
          header: () => (
            <View style={{height: 200}}>
              <ScrollView horizontal={true} style={{width: '100%'}}>
                {
                editBackPage === false?profileDetail.photoLinks.map((item: any, index: any) => (
                  <ImageBackground
                    key={index}
                    style={{
                      width: width,
                    }}
                    resizeMode="cover"
                    source={{
                      uri: item,
                    }}>
                    <TouchableOpacity
                      style={[{marginTop: 10}]}
                      onPress={() => {
                       navigation.navigate('Matches', {screen: 'Match'}) 
                      }}>
                      <Icon
                        name={'arrow-back-outline'}
                        size={35}
                        color={Colors.FrenchRose}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                ))
                :
                  <ImageBackground
                    style={{
                      width: width,
                    }}
                    resizeMode="cover"
                    source={{
                      uri: loginprofileDetail.photoDetails.profilePicture,
                    }}>
                    <TouchableOpacity
                      style={[{marginTop: 10}]}
                      onPress={() => {
                      navigation.navigate('Account');
                      }}>
                      <Icon
                        name={'arrow-back-outline'}
                        size={35}
                        color={Colors.FrenchRose}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
             
              }
              </ScrollView>
            </View>
          ),
          headerTitleAlign: 'center',
          //   <ImageBackground
          //         style={{
          //           width: '100%',
          //           aspectRatio: 1.6,
          //           borderWidth: 1,
          //           borderRadius: 5,
          //           borderTopEndRadius:5
          //         }}
          //         resizeMode="cover"
          //         source={{
          //           uri: profileDetail.photoLinks[0],
          //         }}></ImageBackground>
          // ),
          // headerStyle: {
          //     backgroundColor: isLightMode?Colors.White:Colors.Brand
          //   },
          headerTitleStyle: {
            color: Colors.Black,
          },
        })}
      />
    </MatchStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: isLightMode ? Colors.Brand : Colors.Brand,
        tabBarLabelStyle: {fontWeight: 'bold', fontSize: 12},
        tabBarStyle: {
          backgroundColor: isLightMode ? Colors.White : Colors.Brand,
        },
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNav}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={30} />,
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen
        name="Matches"
        component={MatchStackNav}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            console.log('tab')
            navigation.navigate('Matches', {screen: 'Match'});
          },
        })}
        options={{
          headerShown: false,
          title: 'Matches',
          tabBarIcon: ({color}) => (
            <Icon name="people-outline" color={color} size={30} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountProfile}
        options={{
          headerShown: false,
          title: 'Account',
          tabBarIcon: ({color}) => (
            <Icon name="person-circle-outline" color={color} size={30} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export function MainNav() {
  const styles = GetStyle();
  const loginid = useAppSelector(state => state.loginId.profileData.id);
  const registrationStatus = useAppSelector(
    state => state.loginId.registrationComplete,
  );
  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="LoginPage"
          screenOptions={{contentStyle: {backgroundColor: '#f6f6f6f'}}}>
          {registrationStatus === false ? (
            <>
              <MainStack.Screen
                name="LoginPage"
                component={LoginPage}
                options={{
                  headerShown: true,
                  headerTitle: 'Swayamvaram  ',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: Colors.White,
                  },
                  headerTitleStyle: {
                    color: Colors.Brand,
                  },
                  //   headerRight: () => null,
                }}
              />
              <MainStack.Screen
                name="Registration"
                component={Registration}
                options={{
                  headerShown: true,
                  headerBackVisible: true,
                  headerRight: () => null,
                  headerTitleAlign: 'left',
                  headerStyle: {
                    backgroundColor: Colors.White,
                  },
                  headerTitleStyle: {
                    color: Colors.Black,
                  },
                }}
              />
            </>
          ) : (
            <>
              <MainStack.Screen
                name="Main"
                component={MainTab}
                options={{
                  headerShown: false,
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: Colors.White,
                  },
                  headerTitleStyle: {
                    color: Colors.Brand,
                  },
                }}
              />
            </>
          )}
        </MainStack.Navigator>
      </NavigationContainer>
      <GlobalModal />
    </>
  );
}

export default MainNav;
