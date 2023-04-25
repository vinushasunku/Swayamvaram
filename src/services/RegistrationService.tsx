import { securePost } from "./APIServices";

export interface RegistrationDto{
    emailAddress:string,
    countryCode:number,
    mobileNumber:number,
    firstName:string,
    lastName:string,
    gender:string,
    creator:string,
    password:string
}
export enum typeProfileDetail {
    Basic,
    FamilyDetail,
    CasteDetail,
    LocationDetail,
    VisaDetail,
    ProfessionalDetail,
    Educationdetail
  }
export interface  dropdowndata{
    id:string,
    title:string
}

export interface  listdata{
    response:[dropdowndata]
}

class RegistrationService {
    
    getRegistrationDetail = (personalDto: RegistrationDto) =>     
          securePost('/matrimony/account/create', personalDto, 'Unable to Create Account Please try again later.');     
  }
  
  export default new RegistrationService();