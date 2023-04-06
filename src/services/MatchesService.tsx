import { secureGet } from "./APIServices";

export interface MatchesInfoDto{
    accountId:string,
    firstName:string,
    middleName:string,
    lastName:string,
    age:string,
    profilePhotoLink:string
}
export interface MatchesPageInfoDto{
    accountId:string,
    pageToke:number
}
export interface ProfileSelectedDto{
    accountId:string,
    selectedProfileId:string
}
class MatchesService{
    getMatchesList=(accountId:string, pageToke:number)=>secureGet('/matrimony/'+accountId+'/matching?pageSize=3&pageToke='+pageToke);
    getProfileDetail=(accountId:string, ProfileId:string)=>secureGet('/matrimony/'+accountId+'/matching/'+ProfileId+'/details');
}

export default new MatchesService();