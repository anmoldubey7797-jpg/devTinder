import { createSlice } from "@reduxjs/toolkit";


const requestSlice=createSlice({
    name:'request',
    initialState:[],
    reducers:{
        addrequest:(state,action)=>{
            return action.payload
        },
         removeUserRequest: (state, action) => {
      return state.filter(user => user._id !== action.payload);
    },
    }
})

export const {addrequest,removeUserRequest}=requestSlice.actions;
export default requestSlice.reducer;