import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {GetStyle} from '../styles/style-sheet';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMatchesProfilelistsByStatus } from '../redux/slices/matches';
import { MatchesInfoDto, SelectedStatus } from '../services/MatchesService';
import store from '../redux/store';

const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
};

const MailBoxScreen = ({navigation}: WizardProps) => {
  const Tab = createMaterialTopTabNavigator();
  function MailBoxTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Pending" component={PendingListRoute}  initialParams={{currentStatus: "REQUEST_SENT"}} />
        <Tab.Screen name="Accept" component={AcceptListRoute} initialParams={{currentStatus: "ACCEPT"}}/>
        <Tab.Screen name="Reject" component={DeclineListRoute} initialParams={{currentStatus: "REJECT"}}/>
      </Tab.Navigator>
    );
  }

  return (
<View  style={[styles.backgroundColor,{ flex: 1 }]}>
{MailBoxTabs()}
</View>

  );
};
const CommonView = (data: any, type:any)=>{
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
const PendingListRoute = ({ route }) => {
  const dispatch: any = useAppDispatch();
  const getMatchPendingList = useAppSelector(state => state.matches.matchesProfileListByStatus);
  const loginprofileDetail = useAppSelector(state => state.loginId.profileData);
  const selectedStatus = useAppSelector(
    state => state.matches.selectedStatus,
  );
  const [data, setPendingDate] = React.useState([]);
  //const currentCity = route.params.currentCity;

  useEffect(()=>{
    console.log('city',route.params["currentStatus"])
    fetchPendingProfileData();
  },[])

  const fetchPendingProfileData = async () => {
    if (loginprofileDetail?.id) {
      selectedStatus.accountId=loginprofileDetail?.id;
      selectedStatus.status=route.params["currentStatus"];
        dispatch(fetchMatchesProfilelistsByStatus(selectedStatus))
        .unwrap()
        .then((response:any) => {
          setPendingDate(response)
          console.log('fetchdata', getMatchPendingList)
        })
        .catch((error: any) => {
          console.log('get matches list', error);
        });
    }
    //setData(getMatchList);
  };
  return(
    <View >
      {/* <Text>{getMatchPendingList[0].firstName}</Text> */}
      {
        CommonView(data,'Pending')
      }
    </View>
  )
}
const AcceptListRoute = ({ route }) => {
  const dispatch: any = useAppDispatch();
  const getMatchPendingList = useAppSelector(state => state.matches.matchesProfileListByStatus);
  const loginprofileDetail = useAppSelector(state => state.loginId.profileData);
  const selectedStatus = useAppSelector(
    state => state.matches.selectedStatus,
  );
  const [acceptdata, setAcceptDate] = React.useState([]);
  //const currentCity = route.params.currentCity;

  useEffect(()=>{
    console.log('city',route.params["currentStatus"])
    fetchAcceptProfileData();
  },[])

  const fetchAcceptProfileData = async () => {
    if (loginprofileDetail?.id) {
      selectedStatus.accountId=loginprofileDetail?.id;
      selectedStatus.status=route.params["currentStatus"];
        dispatch(fetchMatchesProfilelistsByStatus(selectedStatus))
        .unwrap()
        .then((response:any) => {
          setAcceptDate(response)
        })
        .catch((error: any) => {
          console.log('get matches list', error);
        });
    }
    //setData(getMatchList);
  };
  return(
    <View >
      {/* <Text>{getMatchPendingList[0].firstName}</Text> */}
      {
        CommonView(acceptdata,'Accept')
      }
    </View>
  )
}

const DeclineListRoute = ({ route }) => {
  const dispatch: any = useAppDispatch();
  const getMatchPendingList = useAppSelector(state => state.matches.matchesProfileListByStatus);
  const loginprofileDetail = useAppSelector(state => state.loginId.profileData);
  const selectedStatus = useAppSelector(
    state => state.matches.selectedStatus,
  );
  const [declinedata, setDeclineDate] = React.useState([]);
  
  //const currentCity = route.params.currentCity;

  useEffect(()=>{
    console.log('city',route.params["currentStatus"])
    FetchData();
  },[])

  function FetchData(){
    if (loginprofileDetail?.id) {
      selectedStatus.accountId=loginprofileDetail?.id;
      selectedStatus.status=route.params["currentStatus"];
        store.dispatch(fetchMatchesProfilelistsByStatus(selectedStatus))
        .unwrap()
        .then((response:any) => {
          setDeclineDate(response)
        })
        .catch((error: any) => {
          console.log('get matches list', error);
        });
    }
  }

  return(
    <View >
      {/* <Text>{getMatchPendingList[0].firstName}</Text> */}
      {
        CommonView(declinedata,'Decline')
      }
    </View>
  )
}


export default MailBoxScreen;
