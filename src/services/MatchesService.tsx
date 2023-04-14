import { secureGet, securePut } from "./APIServices";

export interface MatchesInfoDto{
    accountId:string,
    firstName:string,
    middleName:string,
    lastName:string,
    age:string,
    profilePhotoLink:string
}
export interface MatchesStatusInfoDto{
    profile1Id:string,
    profile2Id:string,
    status:string,
    statusReason:StatusReasonDto
}
export interface StatusReasonDto{
    requestSentByProfileId:string,
    acceptedByProfileId:string,
    rejectedByProfileId:string[],
    viewedByProfileIds:string[]

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
    getMatchingStatus=(accountId:string, ProfileId:string)=>secureGet('/matrimony/'+accountId+'/matching/'+ProfileId+'/status');
    sendProposal = (accountId:string, ProfileId:string) =>     
    securePut('/matrimony/'+accountId+'/matching/'+ProfileId+'/sentProposal');  
    rejectProposal = (accountId:string, ProfileId:string) =>     
    securePut('/matrimony/'+accountId+'/matching/'+ProfileId+'/reject');  
}

export default new MatchesService();