import { createSlice } from "@reduxjs/toolkit";
import { Exception } from "sass";

const initialState = {
  cart: [],
  cartStatus: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    tryFetchCartFromLocalStorage(state, action) { //получение товаров из корзины
      try {
        let localData = localStorage.getItem("cart");//получаем cart

        if (!localData)
          throw new Exception("there's no cart data in local storage");//ошибка,если пусто

        state.cart = JSON.parse(localData);//JSON объект преобразуем к js
      } catch (err) {
        console.log(err.message);
      }
    },
    addToCart(state, action) {
      let filtrationResult = state.cart.find(
        (obj) => obj.title == action.payload.title //сравниваем название объекта с тем, которое пришло из вне
      );

      if (filtrationResult !== undefined) { //если товар есть в корзине
        state.cart = state.cart.map((obj) => {
          if (obj.title === action.payload.title) {
            return { ...obj, count: obj.count + 1 }; //создание нового объекта, который содержит все состояния текущего
          }

          return obj;
        });
      } else { //если товара нет в корзине
        state.cart.push({ ...action.payload, count: 1 });
      }

      let cart = JSON.stringify(state.cart);
      localStorage?.setItem("cart", cart);//если существует наш объект, то добавляем карточку

      console.log(cart);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item.title != action.payload.title //убираем из хранилища картоку, название которое нам пришло
      );

      localStorage?.setItem("cart", JSON.stringify(state.cart));
    },
    changeProductCount(state, action) { //изменение количества
      state.cart = state.cart.map((obj) => {
        if (obj.title === action.payload.title) {
          let newCount = obj.count + action.payload.growth;

          return { ...obj, count: newCount > 0 ? newCount : 1 };
        }

        return obj;
      });

      localStorage?.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  tryFetchCartFromLocalStorage,
  changeProductCount,
} = cartSlice.actions;

export const cartReducers = cartSlice.reducer;
