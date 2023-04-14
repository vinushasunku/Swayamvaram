import {InitialState} from '@react-navigation/native'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { profileDto } from '../../services/LoginService';
import { createCaste } from './caste';
import { createEducation, createProfessional } from './education';
import { createFamily } from './family';
import { createLocation } from './location';
import { createPersonal } from './personal';

export const initialState={
  loginStatus:'idle',
  loginError:'',
  pagination:'',
  registrationComplete:false,
  profileData:createProfile(),
}
export function createProfile(): profileDto{
  return{
     id:'',
     password:'',
     personalDetails:createPersonal(),
     familyDetails:createFamily(),
     regionDetails:createCaste(),
     locationDetails:createLocation(),
     professionDetails:createProfessional(),
     educationDetails:createEducation(),
     photoLinks:[]

  };

}
export const loginSlice = createSlice({
    name: "loginId",
    initialState,
    reducers: {
      setProfileInfo(state, action: PayloadAction<any>) {
        state.profileData = action.payload
      },
      setResitrationInfo(state, action: PayloadAction<any>) {
        state.registrationComplete = action.payload
      },
      setPaginationId(state, action: PayloadAction<any>) {
        state.pagination = action.payload
      }
    }
  })
  
  export const { setProfileInfo,setPaginationId,setResitrationInfo} = loginSlice.actions
  export default loginSlice.reducer
