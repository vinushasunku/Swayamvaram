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
import { fetchMatchesProfilelistsByStatus, fetchShortlistedProfile } from '../redux/slices/matches';
import { MatchesInfoDto, SelectedStatus } from '../services/MatchesService';
import store from '../redux/store';
import CommonViewForAction from '../components/CommonViewForAction';

const styles: any = GetStyle();
type WizardProps = {
  navigation: any;
};

const ShortListScreen = ({navigation}: WizardProps) => {
  const Tab = createMaterialTopTabNavigator();
  const loginprofileDetail = useAppSelector(state => state.loginId.profileData);
  const getShortlistedProfile = useAppSelector(state => state.matches.matchesShortlistedProfile);
  const dispatch: any = useAppDispatch();
  useEffect(()=>{
    fetchShortlistedData();
  },[])

  const fetchShortlistedData = async () => {
    if (loginprofileDetail?.id) {
        dispatch(fetchShortlistedProfile(loginprofileDetail?.id))
        .unwrap()
        .then((response:any) => {
        })
        .catch((error: any) => {
          console.log('get matches list', error);
        });
    }
  }
  return (
<View  style={[styles.backgroundColor,{ flex: 1 }]}>
 <CommonViewForAction data={getShortlistedProfile} type={'Shortlisted'}/>
</View>

  );
};

export default ShortListScreen;
