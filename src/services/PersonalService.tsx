import { secureGet, securePost } from "./APIServices"

export interface PersonalDto{
    emailAddress:string,
    countryCode:number,
    mobileNumber:number,
    firstName:string,
    lastName:string,
    gender:string,
    creator:string,
    password:string
}



class PersonalService{
    SavePersonalDetail = (personalDto: PersonalDto) =>     
          securePost('/matrimony/account/create', personalDto, 'Unable to Create Account Please try again later.'); 
        
}

export default new PersonalService();