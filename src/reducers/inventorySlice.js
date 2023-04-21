import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  inventory: {},
};

const authSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});


export default authSlice.reducer;