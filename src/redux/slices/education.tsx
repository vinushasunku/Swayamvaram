import {InitialState} from '@react-navigation/native';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EducationDataDto, EducationInfoDto, ProfessionalDataDto} from '../../services/EducationServices';

export const initialState = {
  religionStatus: 'idle',
  religionError: '',
  educationData: createEducation(),
  professionalData:createProfessional(),
  //educationDataList: createEducationList(),
};
export function createEducation(): EducationInfoDto {
  return {
    degree: '',
    course: '',
    passoutYear: 0,
  };
}
export function createProfessional(): ProfessionalDataDto {
    return {
        employment:'',
    profession:'',
    company:'',
    salary:0,
    currency:''
    };
  }
// export function createEducationList(): [EducationDataDto]{
//     return[
//       {
//         id:'',
//         name:'',
//         hasNextLevel:'',
//         nextLevelName:''
//     }
//     ]
  
//   }
export const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    resetQuery: () => {
      return initialState;
    },
    syncEducationState: (
      state: any,
      action: PayloadAction<EducationInfoDto>,
    ) => {
      state.educationData = action.payload;
    },
    // setEducationListId(state, action: PayloadAction<[EducationDataDto]>) {
    //     state.educationDataList=action.payload
    //   }
  },
});

export const {syncEducationState} = educationSlice.actions;
export const getEducation = (state: any) => state.educationData;
export const getProfessional = (state: any) => state.professionalData;
export default educationSlice.reducer;
