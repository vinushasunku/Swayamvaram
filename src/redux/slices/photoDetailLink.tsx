import {InitialState} from '@react-navigation/native';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { PhotoDetails, PhotoList } from '../../services/LoginService';

export const initialState = {
  religionStatus: 'idle',
  religionError: '',
  photoData: createProfilePhotoDetail(),

};
export function createProfilePhotoDetail(): PhotoDetails{
  return{
   photoList:createProfilePhotoList(),
   profilePicture:''

  };

}
export function createProfilePhotoList(): [PhotoList]{
  return[{
    photoId:'',
    verificationStatus:''
  }]

}

export const photoDetailLinkSlice = createSlice({
  name: 'photoDetailLink',
  initialState,
  reducers: {
    resetQuery: () => {
      return initialState;
    },
    syncphotoDetailLinkState: (
      state: any,
      action: PayloadAction<PhotoDetails>,
    ) => {
      state.educationData = action.payload;
    },
    // setEducationListId(state, action: PayloadAction<[EducationDataDto]>) {
    //     state.educationDataList=action.payload
    //   }
  },
});

export const {syncphotoDetailLinkState} = photoDetailLinkSlice.actions;
export const getPhotoDetail = (state: any) => state.photoData;
export default photoDetailLinkSlice.reducer;
