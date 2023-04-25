import {InitialState} from '@react-navigation/native'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { profileDto } from '../../services/LoginService';
import { createCaste } from './caste';
import { createEducation, createProfessional } from './education';
import { createFamily } from './family';
import { createLocation } from './location';
import { createPersonal } from './personal';
import { createProfilePhotoDetail } from './photoDetailLink';

export const initialState={
  loginStatus:'idle',
  loginError:'',
  pagination:'',
  registrationComplete:false,
  editProfile:false,
  editProfileDetail:false,
  editType:'',
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
     photoDetails:createProfilePhotoDetail(),
     photoLinks:[]
  };

}


export const loginSlice = createSlice({
    name: "loginId",
    initialState,
    reducers: {
      setProfileInfo(state, action: PayloadAction<any>) {
        console.log('loginprofile',action.payload.password)
        state.profileData = action.payload
        state.profileData.personalDetails.emailAddress=action.payload.emailAddress
        state.profileData.personalDetails.mobileNumber=action.payload.mobileNumber
        state.profileData.personalDetails.countryCode=action.payload.countryCode
        state.profileData.personalDetails.password=action.payload.password
       state.profileData.photoDetails.profilePicture='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg'
       
      },
      setResitrationInfo(state, action: PayloadAction<any>) {
        state.registrationComplete = action.payload
      },
      setPaginationId(state, action: PayloadAction<any>) {
        state.pagination = action.payload
      },
      setEditProfileDetail(state, action: PayloadAction<any>) {
        state.editProfile = action.payload
      },
      setEditProfileDetailInfo(state, action: PayloadAction<any>) {
        state.editProfileDetail = action.payload
      },
      setEditType(state, action: PayloadAction<any>) {
        state.editType = action.payload
      }
    }
  })
  
  export const { setProfileInfo,setPaginationId,setResitrationInfo,setEditProfileDetail,setEditProfileDetailInfo,setEditType} = loginSlice.actions
  export default loginSlice.reducer
