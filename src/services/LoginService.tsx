import {securePost} from './APIServices';
import { CasteInfoDto } from './CasteService';
import { EducationInfoDto, ProfessionalDataDto } from './EducationServices';
import { FamilyInfoDto } from './FamilyService';
import { LocationInfoDto } from './LocationService';
import { PersonalDto } from './PersonalService';
export interface LoginDto {
  // countryCode: number;
  // mobileNumber: number;
  emailAddress:string;
  password: string;
}
export interface profileDto{
  id:string;
  personalDetails:PersonalDto;
  familyDetails:FamilyInfoDto;
  religionDetails:CasteInfoDto;
  locationDetails:LocationInfoDto;
  professionDetails:ProfessionalDataDto;
  educationDetails:EducationInfoDto;
  password:string;
  photoDetails:PhotoDetails;
  photoLinks:string[];
}
export interface PhotoDetails {
  photoList: PhotoList[]
  profilePicture: any
}

export interface PhotoList {
  photoId: string
  verificationStatus: string
}
class LoginService {
    
  getLoginDetail = (login: LoginDto) =>
    
        securePost('/matrimony/account/authenticate', login, 'Unable to login');
    
   
}

export default new LoginService();