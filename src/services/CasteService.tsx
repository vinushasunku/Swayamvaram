import { secureGet, securePost } from "./APIServices"

export interface CasteInfoDto{
    religion:string,
    caste:string,
    subCaste:string
}
export interface  ReligionDataDto{
    id:string,
    name:string,
    hasNextLevel:string,
    nextLevelName:string
}


class ReligionService{
    getReligion=()=>secureGet('/matrimony/religion')
    getcaste=(regionName:string)=>secureGet('/matrimony/religion/'+regionName);
    getSubcaste=(regionName:string,casteName:string)=>secureGet('/matrimony/religion/'+regionName+'/'+casteName);
        
    saveReligionDetail = (casteDto: CasteInfoDto, accountId:string) =>     
          securePost('/matrimony/account/'+accountId+'/addReligion', casteDto, 'Unable to save religious info. Please try again later.'); 
}

export default new ReligionService();