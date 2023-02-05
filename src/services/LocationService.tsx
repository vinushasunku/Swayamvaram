import { secureGet, securePost } from "./APIServices"

export interface LocationInfoDto{
    country:string,
    state:string,
    city:string,
    citizenship:string,
    visaStatus:string,
    visaExpiryMonth:number,
    visaExpiryYear:number,
    
}
export interface  LocationDataDto{
    id:string,
    name:string,
    hasNextLevel:string,
    nextLevelName:string
}


class LocationService{
    getCountries=()=>secureGet('/matrimony/location')
    getStates=(countryName:string)=>secureGet('/matrimony/location/'+countryName);
    getCities=(countryName:string,stateName:string)=>secureGet('/matrimony/location/'+countryName+'/'+stateName);
    saveLocationDetail = (locationdto: LocationInfoDto, accountId:string) =>     
    securePost('/matrimony/account/'+accountId+'/addLocation', locationdto, 'Unable to save loaction info. Please try again later.');   
}

export default new LocationService();