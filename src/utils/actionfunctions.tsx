import MatchesService from "../services/MatchesService";

export async function sendButton(accountId:any,id:any) {
    console.log('Send');
    MatchesService.sendProposal(accountId,id).then((response:any)=>{
     console.log('success send')
  }).catch((error:any)=>{
      console.log('error:',error)})
  }
 export async function rejectButton(accountId:any,id:any) {
    console.log('Send');
    MatchesService.rejectProposal(accountId,id).then((response:any)=>{
     console.log('success send')
  }).catch((error:any)=>{
      console.log('error:',error)})
  }

  export async function acceptButton(accountId:any,id:any) {
    MatchesService.acceptProposal(accountId,id).then((response:any)=>{
     console.log('success accept')
  }).catch((error:any)=>{
      console.log('error:',error)})
  }

  export async function withdrawalButton(accountId:any,id:any) {
    console.log('Send');
    MatchesService.withDrawalProposal(accountId,id).then((response:any)=>{
     console.log('success withdrawal')
  }).catch((error:any)=>{
      console.log('error:',error)})
  }