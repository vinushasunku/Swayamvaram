import {securePost} from './APIServices';
import { CasteInfoDto } from './CasteService';
import { EducationInfoDto, ProfessionalDataDto } from './EducationServices';
import { FamilyInfoDto } from './FamilyService';
import { LocationInfoDto } from './LocationService';
import { PersonalDto } from './PersonalService';
export interface LoginDto {
  countryCode: number;
  mobileNumber: number;
  password: string;
}
export interface profileDto{
  id:string;
  personalDetails:PersonalDto;
  familyDetails:FamilyInfoDto;
  regionDetails:CasteInfoDto;
  locationDetails:LocationInfoDto;
  professionDetails:ProfessionalDataDto;
  educationDetails:EducationInfoDto;
  password:string;
}
class LoginService {
    
  getLoginDetail = (login: LoginDto) =>
    
        securePost('/matrimony/account/authenticate', login, 'Unable to login');
    
   
}

export default new LoginService();