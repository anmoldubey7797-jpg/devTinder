import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.user= action.payload
        },
        removerUser:(state,action)=>{
            state.user= null;
        }
    }
})


export const {addUser,removerUser}=userSlice.actions
export default userSlice.reducer