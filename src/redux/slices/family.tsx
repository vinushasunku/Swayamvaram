import {InitialState} from '@react-navigation/native';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { FamilyInfoDto } from '../../services/FamilyService';

export const initialState = {
  religionStatus: 'idle',
  religionError: '',
  familyData: createFamily()
};
export function createFamily(): FamilyInfoDto {
  return {
    fatherName: '',
    motherName: '',
    brothers: 0,
    sisters:0
  };
}


export const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    resetQuery: () => {
      return initialState;
    },
    syncFamilyState: (
      state: any,
      action: PayloadAction<FamilyInfoDto>,
    ) => {
      state.familyData = action.payload;
    },

  },
});

export const {syncFamilyState} = familySlice.actions;
export const getFamily = (state: any) => state.familyData;
export default familySlice.reducer;
