import {InitialState} from '@react-navigation/native'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PersonalDto } from '../../services/PersonalService';

export const initialState={
    religionStatus:'idle',
    religionError:'',
    personalData:createPersonal(),
}
export function createPersonal(): PersonalDto{
    return{
        emailAddress:'',
        countryCode:0,
        mobileNumber:0,
        firstName:'',
        lastName:'',
        gender:'',
        creator:'',
        password:''
  
      };
}



export const personalSlice = createSlice({
    name: "Personal",
    initialState,
    reducers: {
      resetQuery:()=>{
        return initialState
      },
      syncPersonalState:(state:any,action:PayloadAction<PersonalDto>)=>{
        state.personalData=action.payload
      }
    },
    extraReducers: builder => {
    }
  
  })
  
  export const {syncPersonalState } = personalSlice.actions
  export default personalSlice.reducer