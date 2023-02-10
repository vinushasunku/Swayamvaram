import { secureGet, securePost } from "./APIServices"

export interface EducationInfoDto{
    degree:string,
    course:string,
    passoutYear:number
    
}
export interface  ProfessionalDataDto{
    employment:string,
    profession:string,
    company:string,
    salary:number,
    currency:string
}
export interface  EducationDataDto{
    id:string,
    name:string,
    hasNextLevel:string,
    nextLevelName:string
}

class EducationService{
    saveeducationDetail = (educationdto: EducationInfoDto, accountId:string) =>     
    securePost('/matrimony/account/'+accountId+'/addEducation', educationdto, 'Unable to save education info. Please try again later.');   
    saveProfessionalDetail = (professionaldto: ProfessionalDataDto, accountId:string) =>     
    securePost('/matrimony/account/'+accountId+'/addProfession', professionaldto, 'Unable to save education info. Please try again later.'); 
}

export default new EducationService();