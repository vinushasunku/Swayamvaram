import axios, {AxiosError, AxiosInstance} from 'axios';
import axiosRetry from 'axios-retry';
import {resetData, setModalData} from '../redux/slices/appData';
import store from '../redux/store';
import {RetryMessage} from '../components/GlobalModal';
import {Platform} from 'react-native';

const doLog: boolean = false;

let _secureCall: AxiosInstance | null;
let _secureCallNoRetry: AxiosInstance | null;
let accessToken: string;
let refreshToken: string;

const ERROR_CODES = {
    VALIDATION_ERROR_CODE: 99999,
  };
  
  const ERROR_KEYS = {
    VALIDATION_MESSAGES: 'validationMessages',
    ERROR_CODE: 'errorCode',
    ERROR_MESSAGE: 'errorMessage',
    DISPLAY_MESSAGE: 'displayMessage',
  };

  export const createSecureService = () => {  
   
  
    const secureCall: any = {
      baseURL: 'https://q3u939f55c.execute-api.ap-south-1.amazonaws.com',
      timeout: 30000,
      responseType: 'json',
    //   headers: {
    //     Authorization: 'Bearer ' + authResult.idToken,
    //     'Content-Type': 'application/json',
    //   },
    };
  _secureCallNoRetry = axios.create(secureCall);
  _secureCall = axios.create(secureCall);
  };

  export function destroySecureService() {

    _secureCall = null;
  
    _secureCallNoRetry = null;
  
  }
  
   
  
  export const secureService = (): AxiosInstance => {
  
    if (_secureCall === null || _secureCall === undefined) {
  
      throw console.error('Secure service not created yet.');
  
    } else {
  
      return _secureCall;
  
    }
  
  };

  export const insecureService = (): AxiosInstance => {

    const regularCall = axios.create({
  
      baseURL:  'https://q3u939f55c.execute-api.ap-south-1.amazonaws.com',
  
      timeout: 30000,
  
      responseType: 'json',
  
    });
  

  
    return regularCall;
  
  };

  export async function secureGet(url: string) {
    console.log('url',url)
    try {
      const ret = await _secureCall?.get(url);
  
      store.dispatch(resetData());
  
      return ret;
  
    } catch (err) {
  
      handleApiError(err, undefined);
  
      return undefined;
  
    }
  
  }
  
   
  
  export async function secureGetNoRetry(url: string) {
  
    return await _secureCallNoRetry?.get(url);
  
  }
  
   
  
  export async function securePut(url: string, body: any) {
    try {
  
      const ret = await _secureCall?.put(url, body);
  
      store.dispatch(resetData());
  
      return ret;
  
    } catch (err) {
  
      handleApiError(err, undefined);
  
      return undefined;
  
    }
  
  }
  
   
  
  export async function securePost(url: string, body: any, errMsg: string) {
  
    try {
      console.log(url,body,_secureCall);
      const ret = await _secureCall?.post(url, body);
      //store.dispatch(resetData());
  
      return ret;
  
    } catch (err) {
  
      handleApiError(err, errMsg);
  
      return undefined;
  
    }
  
  }
  
   
  
  export async function insecureGet(url: string) {
  
    try {
  
      const ret = await insecureService().get(url);
  
      store.dispatch(resetData());
  
      return ret;
  
    } catch (err) {
  
      handleApiError(err, undefined);
  
      return undefined;
  
    }
  
  }

  function handleApiError(err: any, errMsg: any) {

    const errorMessage = {
  
      isVisible: true,
  
      title: 'Connection Error',
  
      message: errMsg ? errMsg : 'Network connection failed.',
  
      btnText: 'Continue',
  
      canClose: true,
  
      showLoading: false,
  
    };
  
    if (err.response && err.response.data?.displayMessage?.length > 0) {
  
      errorMessage.message = err.response.data.displayMessage;
  
   
  
      if (err.response.data?.errorCode === ERROR_CODES.VALIDATION_ERROR_CODE) {
  
        const validationMessages =
  
          err.response.data?.validationMessages.join('\n');
  
        errorMessage.message = errorMessage.message + '\n' + validationMessages;
  
      }
  
    }
  
   
  
    store.dispatch(setModalData(errorMessage));
  
  }