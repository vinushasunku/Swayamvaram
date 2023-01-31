import {InitialState} from '@react-navigation/native'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import CasteService, { CasteInfoDto, ReligionDataDto } from '../../services/CasteService'

export const initialState={
    religionStatus:'idle',
    religionError:'',
    casteData:createCaste(),
    religionData:createReligionData(),
    casteList:createCasteList(),
    subCasteList:createSubCasteList()
}
export function createCaste(): CasteInfoDto{
    return{
        religion:'',
        caste:'',
        subCaste:''
    };

}
export function createCasteList(): [ReligionDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
  }
  ]

}
export function createSubCasteList(): [ReligionDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
  }
  ]

}
export function createReligionData(): [ReligionDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
    },
  ]

}

export const fetchReligionlists=createAsyncThunk(
  'matrimony/getReligion',
  async () =>{
    const res= await CasteService.getReligion();
    return res? res?.data?.values :undefined
  }
);
export const fetchCastelists=createAsyncThunk(
  '/matrimony/religion/',
  async (regionName:string) =>{
    const res= await CasteService.getcaste(regionName);
    return res? res?.data?.values :undefined
  }
);
export const fetchSubCastelists=createAsyncThunk(
  '/matrimony/Subreligion/',
  async (religion:CasteInfoDto) =>{
    const res= await CasteService.getSubcaste(religion.religion,religion.caste);
    return res? res?.data?.values :undefined
  }
);
export const casteSlice = createSlice({
    name: "Caste",
    initialState,
    reducers: {
      setCasteData:(state, action: PayloadAction<CasteInfoDto>)=> {
        state.casteData=action.payload        
      },
      resetQuery:()=>{
        return initialState
      },
    },
    extraReducers: builder => {
      builder.addCase(fetchReligionlists.fulfilled, (state, action) => {
        state.religionStatus='succeeded',
        state.religionError='';
        if(action.payload){
          state.religionData=action.payload
        }
      }),
      builder.addCase(fetchReligionlists.pending, (state, action) => {
        state.religionStatus='loading',
        state.religionError='';
      }),
      builder.addCase(fetchReligionlists.rejected, (state, action) => {
        state.religionStatus='failed',
        state.religionError='Unable to get list';
      }),
      builder.addCase(fetchCastelists.fulfilled, (state, action) => {
        state.religionStatus='succeeded',
        state.religionError='';
        if(action.payload){
          state.casteList=action.payload
        }
      }),
      builder.addCase(fetchCastelists.pending, (state, action) => {
        state.religionStatus='loading',
        state.religionError='';
      }),
      builder.addCase(fetchCastelists.rejected, (state, action) => {
        state.religionStatus='failed',
        state.religionError='Unable to get list';
      }),
      builder.addCase(fetchSubCastelists.fulfilled, (state, action) => {
        state.religionStatus='succeeded',
        state.religionError='';
        if(action.payload){
          state.subCasteList=action.payload
        }
      }),
      builder.addCase(fetchSubCastelists.pending, (state, action) => {
        state.religionStatus='loading',
        state.religionError='';
      }),
      builder.addCase(fetchSubCastelists.rejected, (state, action) => {
        state.religionStatus='failed',
        state.religionError='Unable to get list';
      })
    }
  
  })
  
  export const { setCasteData} = casteSlice.actions
  export  const getCaste=(state:any)=>state.casteData;
  export  const getReligion=(state:any)=>state.religionData;
  export  const getCasteList=(state:any)=>state.casteList;
  export  const getSubCasteList=(state:any)=>state.subCasteList;
  export const getCasteData=(state:any)=>{
    return [
      {
        id:0,
        title:'Religion',
        databind:'religion',
        textIcon:true,
        icon:'chevron-forward-outline',
        action:''
      },
      {
        id:1,
        title:'Caste',
        databind:'caste',
        textIcon:true,
        icon:'chevron-forward-outline',
        action:''
      },
      {
        id:2,
        title:'Sub Caste',
        databind:'subcaste',
        textIcon:true,
        icon:'chevron-forward-outline',
        action:''
      }
    ]
  }

  export default casteSlice.reducer