import MatchesService from "../services/MatchesService";
import store from '../redux/store'
import { fetchMatchingStatus } from "../redux/slices/matches";
import { fetchCastelists, fetchReligionlists, fetchSubCastelists } from "../redux/slices/caste";
export async function sendButton(accountId: any, id: any) {
  return MatchesService.sendProposal(accountId, id).then((response: any) => {
    return true
  }).catch((error: any) => {
    return false
    console.log('error:', error)
  })
}
export async function rejectButton(accountId: any, id: any) {
  console.log('Send');
  return MatchesService.rejectProposal(accountId, id).then((response: any) => {
    return true
  }).catch((error: any) => {
    return false
    console.log('error:', error)
  })
}

export async function acceptButton(accountId: any, id: any) {
  return MatchesService.acceptProposal(accountId, id).then((response: any) => {
    return true
  }).catch((error: any) => {
    return false
    console.log('error:', error)
  })
}
export async function shortListButton(accountId: any, id: any) {
  return MatchesService.shortlistProfile(accountId, id).then((response: any) => {
    return true
  }).catch((error: any) => {
    return false
    console.log('error:', error)
  })
}
export async function withdrawalButton(accountId: any, id: any) {
  console.log('Send');
  return MatchesService.withDrawalProposal(accountId, id).then((response: any) => {
    return true
  }).catch((error: any) => {
    return false
    console.log('error:', error)
  })
}
export async function matchesStatusResult(selectProfileId: any) {
  return store.dispatch(fetchMatchingStatus(selectProfileId))
    .unwrap()
    .then((response: any) => {
      console.log('matchingstatus2', response)
      return true

    })
    .catch((error: any) => {

      console.log('get matches list', error);
      return false
    });
}
export function GetReligionList() {
  return store.dispatch(fetchReligionlists())
    .unwrap()
    .then(() => {
      return true;
    }).catch((error: any) => {
      return false
    })
}
export function GetCasteList(selectedReligion: any) {
  return store.dispatch(fetchCastelists(selectedReligion))
    .unwrap()
    .then(() => {
      return true;
    }).catch((error: any) => {
      return false
    })
}
export function GetSubCasteList(selectedReligion: any, selectedCaste: any) {
  return store.dispatch(fetchSubCastelists({
    religion: selectedReligion,
    caste: selectedCaste,
    subCaste: ''
  }))
    .unwrap()
    .then(() => {
      return true;
    }).catch((error: any) => {
      return false
    })
}

