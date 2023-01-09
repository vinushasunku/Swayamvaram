import {InitialState} from '@react-navigation/native'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CasteInfo } from '../../services/CasteService'

export const initialState={
    casteData:createCaste(),
    
}
export function createCaste(): CasteInfo{
    return{
        caste:'',
        maritalStatus:''
    };

}
export const casteSlice = createSlice({
    name: "Caste",
    initialState,
    reducers: {
      setCaste:(state, action: PayloadAction<any>)=> {
        state.casteData.push(action.payload)
        
      },
      resetQuery:()=>{
        return initialState
      }
    }
  })
  
  export const { setCaste} = casteSlice.actions
  export  const getCaste=(state:any)=>state.casteData;
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
        id:1,
        title:'Caste',
        databind:'caste',
        textIcon:true,
        icon:'chevron-forward-outline',
        action:''
      },
      {
        id:2,
        title:'Marital Status',
        databind:'maritalstatus',
        textIcon:true,
        icon:'chevron-forward-outline',
        action:''
      }
    ]
  }