import {InitialState} from '@react-navigation/native'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CasteInfo } from '../../services/CasteService'
import { Matchesservice } from '../../services/MatchesService';

export const initialState={
    matchesData:createMatches(),
    
}
export function createMatches(): Matchesservice{
    return{
        firstName:'',
        lastName:'',
        year:''
    };

}
export const matcheSlice = createSlice({
    name: "Matches",
    initialState,
    reducers: {
      setMatches:(state, action: PayloadAction<any>)=> {
        state.matchesData.push(action.payload)
        
      },
      resetQuery:()=>{
        return initialState
      }
    }
  })
  
  export const { setMatches} = matcheSlice.actions
  export  const getMatches=(state:any)=>state.matchesData;
  export const getMatchList=(state:any)=>{
    return[
        {
            id:1,
            firstName:'test',
            lastName:'',
            year:'20'
        },
        {
            id:2,
            firstName:'test2',
            lastName:'',
            year:'20'
        },
    ]
  }
  export const getsortList=(state:any)=>{
    return[
        {
           id:1,
           sortTitle:"All Matches"
        },
        {
            id:2,
            sortTitle:"All Matches"
         },
         {
            id:3,
            sortTitle:"Premium Matches"
         },
         {
            id:4,
            sortTitle:"Mutual Matches"
         }
    ]
  }

  export const getMatchesList=(state:any)=>{
    return[
      {
          id:1,
          firstName:'test1',
          lastName:'',
          year:'20',
          age:20,
          image:'https://reactjs.org/logo-og.png',
      },
      {
          id:2,
          firstName:'test2',
          lastName:'',
          year:'20',
          age:20,
          image:'https://reactjs.org/logo-og.png',
      },
      {
        id:3,
        firstName:'test3',
        lastName:'',
        year:'20',
        age:20,
        image:'https://reactjs.org/logo-og.png',
    },
    {
      id:4,
      firstName:'test4',
      lastName:'',
      year:'20',
      age:20,
      image:'https://reactjs.org/logo-og.png',
  },
  ]
  }
  export const getMoreMatchesList=(state:any)=>{
    return[
      {
          id:5,
          firstName:'test5',
          lastName:'',
          year:'20',
          age:20,
          image:'https://reactjs.org/logo-og.png',
      },
      {
          id:6,
          firstName:'test6',
          lastName:'',
          year:'20',
          age:20,
          image:'https://reactjs.org/logo-og.png',
      },
      {
        id:7,
        firstName:'test7',
        lastName:'',
        year:'20',
        age:20,
        image:'https://reactjs.org/logo-og.png',
    },
    {
      id:8,
      firstName:'test8',
      lastName:'',
      year:'20',
      age:20,
      image:'https://reactjs.org/logo-og.png',
  },
  ]
  }