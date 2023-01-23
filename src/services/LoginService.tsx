import {securePost} from './APIServices';
export interface LoginDto {
  countryCode: number;
  mobileNumber: number;
  password: string;
}

class LoginService {
    
  getLoginDetail = (login: LoginDto) =>
    
        securePost('/matrimony/account/authenticate', login, 'Unable to login');
    
   
}

export default new LoginService();