import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cart";
import userReducer from "../reducers/user";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
