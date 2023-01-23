import {InitialState} from '@react-navigation/native'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import CasteService, { CasteInfoDto, ReligionDataDto } from '../../services/CasteService'

export const initialState={
    religionStatus:'idle',
    religionError:'',
    casteData:createCaste(),
    religionData:createReligionData(),
    
}
export function createCaste(): CasteInfoDto{
    return{
        religion:'',
        caste:'',
        subcaste:''
    };

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
    console.log('resdata',res?.data.values)
    return res? res?.data?.values :undefined
  }
);
export const casteSlice = createSlice({
    name: "Caste",
    initialState,
    reducers: {
      setCasteData:(state, action: PayloadAction<CasteInfoDto>)=> {
        state.casteData=action.payload
        //state.casteData.push(action.payload)
        
      },
      resetQuery:()=>{
        return initialState
      },
    },
    extraReducers: builder => {
      builder.addCase(fetchReligionlists.fulfilled, (state, action) => {
        console.log('payload',action)
        state.religionStatus='succeeded',
        state.religionError='';
        console.log('success',action)
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
      });
  
    },
  
  })
  
  export const { setCasteData} = casteSlice.actions
  export  const getCaste=(state:any)=>state.casteData;
  export  const getReligion=(state:any)=>state.religionData;
  export const getCasteList=(state:any)=>{
    return[
        {
            id:1,
            title:'Hindu'
        },
        {
            id:2,
            title:'Christian'
        },
    ]
  }
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