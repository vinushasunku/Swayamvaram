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
}

export default new ReligionService();