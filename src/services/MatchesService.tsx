import { secureGet } from "./APIServices";

export interface MatchesInfoDto{
    accountId:string,
    firstName:string,
    middleName:string,
    lastName:string,
    age:string,
    profilePhotoLink:string
}
class MatchesService{
    getMatchesList=(accountId:string)=>secureGet('/matrimony/'+accountId+'/matching?pageSize=10');
}

export default new MatchesService();