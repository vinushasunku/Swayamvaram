import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import thunk from 'redux-thunk'
import loginReducer from './slices/login';
import appDataReducer from '../redux/slices/appData'

const reducers=combineReducers({
    loginId: loginReducer,
    appData:appDataReducer
})
const persistConfig={
    key:'root',
    storage:AsyncStorage,
    whitelist:['flags'],
}
const rootReducer=(state:any,action:any)=>{
    return reducers(state,action)
};
const persistedReducer=persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware:[thunk]
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export default store;