import {InitialState} from '@react-navigation/native'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RegistrationDto } from '../../services/RegistrationService'

export const initialState={
    registrationData:createRegistration(),
    
}
export function createRegistration(): RegistrationDto{
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
export const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
      setRegistration:(state, action: PayloadAction<any>)=> {
        state.registrationData.push(action.payload)
        
      },
      resetQuery:()=>{
        return initialState
      }
    }
  })
  
  export const { setRegistration} = registrationSlice.actions
  export  const getRegistration=(state:any)=>state.registrationData;
  export const getReligion=(state:any)=>{
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
  export const getCountryCode=(state:any)=>{
    return[
        {
            id:1,
            title:'Australia (+61)'
        },
        {
            id:2,
            title:'United States of America (+1)'
        },
    ]
  }
  export const getRegistrationData=(state:any)=>{
    return [
      {
        id:1,
        title:'Email',
        databind:'emailAddress',
        textIcon:false,
        icon:'',
        action:''
      },
      {
        id:2,
        title:'First Name',
        databind:'firstName',
        textIcon:false,
        icon:'',
        action:''
      },
      {
        id:3,
        title:'Last Name',
        databind:'lastName',
        textIcon:false,
        icon:'',
        action:''
      },
      {
        id:4,
        title:'Gender',
        databind:'gender',
        textIcon:true,
        icon:'',
        action:'radiobutton'
      },
      {
        id:5,
        title:'Mobile Number',
        databind:'mobileNumber',
        textIcon:true,
        icon:'',
        action:'radiobutton'
      },
      {
        id:6,
        title:'Creator',
        databind:'creator',
        textIcon:true,
        icon:'',
        action:'radiobutton'
      },
      {
        id:7,
        title:'Password',
        databind:'password',
        textIcon:false,
        icon:'eye-outline',
        action:''
      },
      {
        id:5,
        title:'countryCode',
        databind:'countryCode',
        textIcon:true,
        icon:'',
        action:'radiobutton'
      },
    ]
  }
  export default registrationSlice.reducer