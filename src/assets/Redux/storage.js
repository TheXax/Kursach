import { configureStore } from "@reduxjs/toolkit";

import { cartReducers } from "./slices/cart";

const store = configureStore({
  reducer: { //то, где пишется весь функционал (создание Redux-хранилища)
    cart: cartReducers,
  },
});

export default store;
