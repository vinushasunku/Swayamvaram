import {createSlice,PayloadAction} from '@reduxjs/toolkit'

export interface AppData{
    modalData:ModalData;
}

export interface ModalData{
    isVisible:boolean;
    title:string;
    message:string;
    btnText:string;
    canClose:boolean;
    showLoading:boolean;
}

export const initialState={
    modalData:{
        isVisible:false,
        title:'',
        message:'',
        btnText:'Close',
        canClose:true,
        showLoading:false,
    }
}

export const appDataSlice= createSlice({
 name:'appData',
 initialState,
 reducers:{
    setModalData:(state:any,action:PayloadAction<ModalData>) =>{
        state.modalData=action.payload;
    },
    resetData:(state:any)=>{
        state.modalData=initialState.modalData;

    },
 },
});

export const {setModalData,resetData}= appDataSlice.actions;
export default appDataSlice.reducer;