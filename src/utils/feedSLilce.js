import { createSlice } from "@reduxjs/toolkit";
import { createContext } from "react";

 const feedSLile=createSlice({
    name:'feed1',
    initialState:[],
    reducers:{
        addUserFeed:(state,action)=>{
            return action.payload
        },
        removeUserFeed:(state,action)=>{
           const newFeed=state.filter((user)=>user._id!=action.payload)
           return newFeed
        }
    }
 })
 export const{addUserFeed,removeUserFeed}=feedSLile.actions
 export default feedSLile.reducer