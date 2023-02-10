import React, {useEffect} from 'react';
import {Appearance, TouchableOpacity, Button, Text, StatusBar} from 'react-native';
import store from '../redux/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../styles/colors';
import {
  NavigationContainer
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import LoginPage from '../pages/LoginPage';
import {GetStyle} from '../styles/style-sheet';
import Registration from '../pages/Registration';
import GlobalModal from '../components/GlobalModal';
import HomeScreen from '../pages/HomeScreen';
import MatchesScreen from '../pages/MatchesScreen';
const styles: any = GetStyle();
Icon.loadFont();
const HomeStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const isLightMode= Appearance.getColorScheme() ==='light'?true:false;
function HomeStackNav() {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({headerTitle: '', headerBackVisible: false,
        headerShown: false,
        headerRight: () => null,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: isLightMode?Colors.White:Colors.Brand
          },
        headerTitleStyle: {
          color: Colors.Black,
        },
    })}
      />
    </HomeStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator screenOptions={()=>({
        tabBarHideOnKeyboard:true,
        tabBarActiveTintColor:isLightMode?Colors.Brand:Colors.Brand,
        tabBarLabelStyle:{fontWeight:'bold',fontSize:12},
        tabBarStyle: {
           backgroundColor: isLightMode?Colors.White:Colors.Brand,
        }
    })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNav}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon:({color}) => <Icon name="home" color={color} size={30}/>,
          unmountOnBlur:true
        }}
      />

<Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          headerShown: false,
          title: 'Matches',
          tabBarIcon:({color}) => <Icon name="people-outline" color={color} size={30}/>,
          unmountOnBlur:true
        }}
      />
    </Tab.Navigator>
  );
}

export function MainNav() {
  const styles = GetStyle();
  const loginid = useAppSelector(state => state.loginId.profileData.id);
  const registrationStatus = useAppSelector(state => state.loginId.registrationComplete);
  return (
   
    <>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="LoginPage" screenOptions={{ contentStyle: {backgroundColor: '#f6f6f6f'}}}>
          {registrationStatus === false ? (
            <>
              <MainStack.Screen
                name="LoginPage"
                component={LoginPage}
                options={{
                  headerShown:true,
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
                options={{headerShown: true,  headerTitle: 'Swayamvaram  ',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: Colors.White,
                    
                },
              headerTitleStyle: {
                color: Colors.Brand,
              },}}
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
