import { secureGet } from "./APIServices"

export interface CasteInfoDto{
    religion:string,
    caste:string,
    subcaste:string
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
}

export default new ReligionService();