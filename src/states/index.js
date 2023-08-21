import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSalice";
import loginSlice from "./loginSlice";
import registerSlice from "./registerSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import jobSlice from "./jobSlice";
import orderReducer from './orderSlice'
const store = configureStore({
  reducer: {
    authSlice,
    loginSlice,
    registerSlice,
    productSlice,
    cartSlice,
    jobSlice,
    orderReducer,
  },
});
export default store;
