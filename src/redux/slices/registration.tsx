import {InitialState} from '@react-navigation/native'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Registration } from '../../services/RegistrationService'

export const initialState={
    registrationData:createRegistration(),
    
}
export function createRegistration(): Registration{
    return{
        firstName:'',
        religion:''
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
        title:'Name',
        databind:'name',
        textIcon:false,
        icon:'',
        action:''
      },
      {
        id:2,
        title:'Gender',
        databind:'gender',
        textIcon:true,
        icon:'',
        action:'radiobutton'
      },
      {
        id:3,
        title:'Date of Birth',
        databind:'dob',
        textIcon:true,
        icon:'calendar-outline',
        action:'calender'
      },
      {
        id:4,
        title:'Religion',
        databind:'religion',
        textIcon:true,
        icon:'chevron-forward-outline',
        action:'setReligiousModel'
      },
      {
        id:5,
        title:'Mother Tongue',
        databind:'MotherTongue',
        textIcon:true,
        icon:'chevron-forward-outline',
        action:'motherTongue'
      },
      {
        id:6,
        title:'Country Code',
        databind:'countryCode',
        textIcon:true,
        icon:'chevron-forward-outline',
        action:'setCountryCodeModel'
      },
      {
        id:7,
        title:'Mobile Number',
        databind:'mobileNumber',
        textIcon:true,
        action:'mobilenumber'
      },
      {
        id:8,
        title:'Password',
        databind:'password',
        textIcon:true,
        icon:'eye-outline',
        action:'password'
      }
    ]
  }
  export default registrationSlice.reducer