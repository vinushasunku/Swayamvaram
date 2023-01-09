import {InitialState} from '@react-navigation/native'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const loginSlice = createSlice({
    name: "loginId",
    initialState: {
      loginId: undefined,
      pagination:'login'
    },
    reducers: {
      setLoginId(state, action: PayloadAction<any>) {
        state.loginId = action.payload
      },
      setPaginationId(state, action: PayloadAction<any>) {
        state.pagination = action.payload
      }
    }
  })
  
  export const { setLoginId,setPaginationId} = loginSlice.actions
  export default loginSlice.reducer