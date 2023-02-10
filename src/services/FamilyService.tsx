import { secureGet, securePost } from "./APIServices"

export interface FamilyInfoDto{
    fatherName:string,
    motherName:string,
    brothers:number,
    sisters:number
    
}


class FamilyService{
    saveFamilyDetail = (familydto: FamilyInfoDto, accountId:string) =>     
    securePost('/matrimony/account/'+accountId+'/addFamily', familydto, 'Unable to save family info. Please try again later.');   
}

export default new FamilyService();