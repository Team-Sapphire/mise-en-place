import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice';
import { createWrapper } from 'next-redux-wrapper';


export const store = configureStore({
  reducer: {
    authReducer,
  },
  devTools: true,
})

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
