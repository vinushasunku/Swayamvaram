import {InitialState} from '@react-navigation/native'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { profileDto } from '../../services/LoginService';
import MatchesService,{ MatchesInfoDto, MatchesPageInfoDto, MatchesStatusInfoDto, ProfileSelectedDto } from '../../services/MatchesService';
import { createCaste } from './caste';
import { createEducation, createProfessional } from './education';
import { createFamily } from './family';
import { createLocation } from './location';
import { createPersonal } from './personal';
import { createProfilePhotoDetail } from './photoDetailLink';

export const initialState={
    matchesData:createMatches(),
    matchesStatus: 'idle',
    matchesError: '',
    matchingStatusLoading:'idle',
    matchingStatusError:'',
    profileDetailStatus: 'idle',
    profileDetailError: '',
    selectedProfileId:selectedprofileInfo(),
    matchesPageInfo:matchesPageInfo(),
    profileDetail:createDetailProfile(),
    matchingStatus:createMatchingStatus(),
    preferenceShow:false
}
export function createMatches(): [MatchesInfoDto]{
    return[{
      accountId:'',
      firstName:'',
      middleName:'',
      lastName:'',
      age:'',
      profilePhotoLink:''
  }];

}
export function matchesPageInfo(): MatchesPageInfoDto{
  return{
      accountId:'',
      pageToke:1
  };

}
export function selectedprofileInfo(): ProfileSelectedDto{
  return{
      accountId:'',
      selectedProfileId:''
  };

}
export function createDetailProfile(): profileDto{
  return{
     id:'',
     password:'',
     personalDetails:createPersonal(),
     familyDetails:createFamily(),
     regionDetails:createCaste(),
     locationDetails:createLocation(),
     professionDetails:createProfessional(),
     educationDetails:createEducation(),
     photoDetails:createProfilePhotoDetail(),
     photoLinks:[]

  };

}
export function createMatchingStatus(): MatchesStatusInfoDto{
  return{
      profile1Id:'',
      profile2Id:'',
      status:'',
      statusReason:{
        requestSentByProfileId:'',
        acceptedByProfileId:'',
        rejectedByProfileId:[],
        viewedByProfileIds:[]        
      }
  };

}
export const fetchMatcheslists=createAsyncThunk(
  '/matrimony/matching/',
  async (info:MatchesPageInfoDto) =>{
    const res= await MatchesService.getMatchesList(info.accountId, info.pageToke);
    return res? res?.data?.matchingProfiles :undefined
  }
);
export const fetchProfiledetail=createAsyncThunk(
  '/matrimony/profilDetail/',
  async (info:ProfileSelectedDto) =>{
    const res= await MatchesService.getProfileDetail(info.accountId, info.selectedProfileId);
    return res? res?.data :undefined
  }
);
export const fetchMatchingStatus=createAsyncThunk(
  '/matrimony/matchingStatus/',
  async (info:ProfileSelectedDto) =>{
    const res= await MatchesService.getMatchingStatus(info.accountId, info.selectedProfileId);
    return res? res?.data :undefined
  }
);
export const matcheSlice = createSlice({
    name: "Matches",
    initialState,
    reducers: {
      setMatches:(state, action: PayloadAction<any>)=> {
        state.matchesData.push(action.payload)      
      },
      setPreferenceVisiable:(state, action: PayloadAction<any>)=> {
        state.preferenceShow=action.payload    
      },
      // setselectedProfileId(state, action: PayloadAction<any>) {
      //   state.selectedProfileId = action.payload
      // },
      setselectedProfileId:(state, action: PayloadAction<any>)=> {
        state.selectedProfileId=action.payload
        
      },
      resetQuery:()=>{
        return initialState
      }
    },
    extraReducers: builder => {
      builder.addCase(fetchMatcheslists.fulfilled, (state, action) => {
        state.matchesStatus='succeeded',
        state.matchesError='';
        if(action.payload){
          state.matchesData=action.payload
        }
      }),
      builder.addCase(fetchMatcheslists.pending, (state, action) => {
        state.matchesStatus='loading',
        state.matchesError='';
      }),
      builder.addCase(fetchMatcheslists.rejected, (state, action) => {
        state.matchesStatus='failed',
        state.matchesError='Unable to get list';
      }),
      builder.addCase(fetchProfiledetail.fulfilled, (state, action) => {
        state.profileDetailStatus='succeeded',
        state.profileDetailError='';
        if(action.payload){
          state.profileDetail=action.payload
          console.log(action.payload,action.payload["mobileNumber"])
           state.profileDetail.photoLinks.push('https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg')
           state.profileDetail.photoLinks.push('https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg')
           state.profileDetail.photoLinks.push('https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg')
          state.profileDetail.personalDetails.mobileNumber=action.payload["mobileNumber"]
          state.profileDetail.personalDetails.countryCode=action.payload["countryCode"]
        }
      }),
      builder.addCase(fetchProfiledetail.pending, (state, action) => {
        state.profileDetailStatus='loading',
        state.profileDetailError='';
      }),
      builder.addCase(fetchProfiledetail.rejected, (state, action) => {
        state.profileDetailStatus='failed',
        state.profileDetailError='Unable to get list';
      }),
      builder.addCase(fetchMatchingStatus.fulfilled, (state, action) => {
        state.matchingStatusLoading='succeeded',
        state.matchingStatusError='';
        if(action.payload){
          state.matchingStatus=action.payload
        }
      }),
      builder.addCase(fetchMatchingStatus.pending, (state, action) => {
        state.matchingStatusLoading='loading',
        state.matchingStatusError='';
      }),
      builder.addCase(fetchMatchingStatus.rejected, (state, action) => {
        state.matchingStatusLoading='failed',
        state.matchingStatusError='Unable to get list';
      })
    }
  })
  
  export const { setMatches,setselectedProfileId,setPreferenceVisiable} = matcheSlice.actions
  export  const getMatches=(state:any)=>state.matchesData;
  export const getMatchList=(state:any)=>{
    return[
        {
            id:1,
            firstName:'test',
            lastName:'',
            year:'20'
        },
        {
            id:2,
            firstName:'test2',
            lastName:'',
            year:'20'
        },
    ]
  }
  export const getsortList=(state:any)=>{
    return[
        {
           id:1,
           sortTitle:"All Matches"
        },
        {
            id:2,
            sortTitle:"All Matches"
         },
         {
            id:3,
            sortTitle:"Premium Matches"
         },
         {
            id:4,
            sortTitle:"Mutual Matches"
         }
    ]
  }

  export const getMatchesList=(state:any)=>{
    return[
      {
          id:1,
          firstName:'test1',
          lastName:'',
          year:'20',
          age:20,
          image:'https://reactjs.org/logo-og.png',
      },
      {
          id:2,
          firstName:'test2',
          lastName:'',
          year:'20',
          age:20,
          image:'https://reactjs.org/logo-og.png',
      },
      {
        id:3,
        firstName:'test3',
        lastName:'',
        year:'20',
        age:20,
        image:'https://reactjs.org/logo-og.png',
    },
    {
      id:4,
      firstName:'test4',
      lastName:'',
      year:'20',
      age:20,
      image:'https://reactjs.org/logo-og.png',
  },
  ]
  }
  export const getMoreMatchesList=(state:any)=>{
    return[
      {
          id:5,
          firstName:'test5',
          lastName:'',
          year:'20',
          age:20,
          image:'https://reactjs.org/logo-og.png',
      },
      {
          id:6,
          firstName:'test6',
          lastName:'',
          year:'20',
          age:20,
          image:'https://reactjs.org/logo-og.png',
      },
      {
        id:7,
        firstName:'test7',
        lastName:'',
        year:'20',
        age:20,
        image:'https://reactjs.org/logo-og.png',
    },
    {
      id:8,
      firstName:'test8',
      lastName:'',
      year:'20',
      age:20,
      image:'https://reactjs.org/logo-og.png',
  },
  ]
  }

  export default matcheSlice.reducer