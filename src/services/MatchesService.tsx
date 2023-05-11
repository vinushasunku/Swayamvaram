import { secureGet, securePost, securePut } from "./APIServices";

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
export interface  ListDropDownDto{
    id:string,
    name:string,
    hasNextLevel:string,
    nextLevelName:string
}

export interface MatchesPageInfoDto{
    accountId:string,
    pageToke:number
}
export interface ProfileSelectedDto{
    accountId:string,
    selectedProfileId:string
}

export interface PrefrenceDataDto {
    age: Age
    salary: Salary
    salaryCurrency: string
    visaStatus: any[]
    employment: any[]
    countries: string[]
    religions: string[]
    castes: string[]
    subCastes: any[]
    profession: any[]
  }
  
  export interface Age {
    min?: number
    max?: number
  }
  
  export interface Salary {
    min?: number
    max?: number
  }
class MatchesService{
    getMatchesList=(accountId:string, pageToke:number)=>secureGet('/matrimony/'+accountId+'/matching?pageSize=4&pageToke='+pageToke);
    getProfileDetail=(accountId:string, ProfileId:string)=>secureGet('/matrimony/'+accountId+'/matching/'+ProfileId+'/details');
    getMatchingStatus=(accountId:string, ProfileId:string)=>secureGet('/matrimony/'+accountId+'/matching/'+ProfileId+'/status');
    sendProposal = (accountId:string, ProfileId:string) =>     
    securePut('/matrimony/'+accountId+'/matching/'+ProfileId+'/sentProposal');  
    rejectProposal = (accountId:string, ProfileId:string) =>     
    securePut('/matrimony/'+accountId+'/matching/'+ProfileId+'/reject');  
    acceptProposal = (accountId:string, ProfileId:string) =>     
    securePut('/matrimony/'+accountId+'/matching/'+ProfileId+'/accept');  
    withDrawalProposal = (accountId:string, ProfileId:string) =>     
    securePut('/matrimony/'+accountId+'/matching/'+ProfileId+'/withdraw');  
    savePreference = (preference: PrefrenceDataDto, accountId:string) =>     
    securePost('/matrimony/account/'+accountId+'/preference', preference, 'Unable to save preference info. Please try again later.'); 
}

export default new MatchesService();