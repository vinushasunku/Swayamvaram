import {InitialState} from '@react-navigation/native'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import CasteService, { CasteInfoDto, ReligionDataDto } from '../../services/CasteService'
import LocationService, { LocationDataDto, LocationInfoDto } from '../../services/LocationService';

export const initialState={
    religionStatus:'idle',
    religionError:'',
    locationData:createLocation(),
    countryData:createCountryData(),
    stateList:createStateList(),
    cityList:createCityList()
}
export function createLocation(): LocationInfoDto{
    return{
    country:'',
    state:'',
    city:'',
    citizenship:'',
    visaStatus:'',
    visaExpiryMonth:0,
    visaExpiryYear:0,
    };

}
export function createStateList(): [LocationDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
  }
  ]

}
export function createCityList(): [LocationDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
  }
  ]

}
export function createCountryData(): [LocationDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
    },
  ]

}

export const fetchCountrylists=createAsyncThunk(
  '/matrimony/getlocation',
  async () =>{
    const res= await LocationService.getCountries();
    return res? res?.data?.values :undefined
  }
);
export const fetchStatelists=createAsyncThunk(
  '/matrimony/state/',
  async (countryName:string) =>{
    const res= await LocationService.getStates(countryName);
    return res? res?.data?.values :undefined
  }
);
export const fetchCitylists=createAsyncThunk(
  '/matrimony/city/',
  async (location:LocationInfoDto) =>{
    const res= await LocationService.getCities(location.country,location.state);
    return res? res?.data?.values :undefined
  }
);
export const locationSlice = createSlice({
    name: "Caste",
    initialState,
    reducers: {
      resetQuery:()=>{
        return initialState
      },
    },
    extraReducers: builder => {
      builder.addCase(fetchCountrylists.fulfilled, (state, action) => {
        state.religionStatus='succeeded',
        state.religionError='';
        if(action.payload){
          state.countryData=action.payload
        }
      }),
      builder.addCase(fetchCountrylists.pending, (state, action) => {
        state.religionStatus='loading',
        state.religionError='';
      }),
      builder.addCase(fetchCountrylists.rejected, (state, action) => {
        state.religionStatus='failed',
        state.religionError='Unable to get list';
      }),
      builder.addCase(fetchStatelists.fulfilled, (state, action) => {
        state.religionStatus='succeeded',
        state.religionError='';
        if(action.payload){
          state.stateList=action.payload
        }
      }),
      builder.addCase(fetchStatelists.pending, (state, action) => {
        state.religionStatus='loading',
        state.religionError='';
      }),
      builder.addCase(fetchStatelists.rejected, (state, action) => {
        state.religionStatus='failed',
        state.religionError='Unable to get list';
      }),
      builder.addCase(fetchCitylists.fulfilled, (state, action) => {
        state.religionStatus='succeeded',
        state.religionError='';
        if(action.payload){
          state.cityList=action.payload
        }
      }),
      builder.addCase(fetchCitylists.pending, (state, action) => {
        state.religionStatus='loading',
        state.religionError='';
      }),
      builder.addCase(fetchCitylists.rejected, (state, action) => {
        state.religionStatus='failed',
        state.religionError='Unable to get list';
      })
    }
  
  })
  
  export const { } = locationSlice.actions
  export  const getLocation=(state:any)=>state.locationData;
  export  const getCountry=(state:any)=>state.countryData;
  export  const getStateList=(state:any)=>state.stateList;
  export  const getCityList=(state:any)=>state.cityList;
  export default locationSlice.reducer