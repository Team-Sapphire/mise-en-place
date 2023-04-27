import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import recipeReducer from "./reducers/recipeSlice.js";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    authReducer,
    recipeReducer,
  },
  devTools: true,
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
