import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  inventory: {},
};

const inventorySlice = createSlice({
  name: 'inveotry',
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


export default inventorySlice.reducer;