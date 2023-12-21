import { createReducer } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const shippingInfo = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};
const initialState = {
  cartItems: items,
  shippingInfo: shippingInfo,
};

export const cartReducer = createReducer(
  initialState,

  {
    addToCart: (state, action) => {
      const item = action.payload;
      const isExist = state.cartItems.find((i) => i.product === item.product);
      if (isExist) {
        state.cartItems = state.cartItems.filter((i) =>
          i.product === isExist.product ? item : i
        );
        for (let i = 0; i < state.cartItems.length; i++) {
          if (state.cartItems[i].product === isExist.product)
            state.cartItems[i] = item;
        }
      } else state.cartItems.push(item);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.product !== id);
    },

    addShippingInfo: (state, action) => {
      state.shippingInfo = {
        address: action.payload.address,
        city: action.payload.city,
        state: action.payload.state,
        country: action.payload.country,
        pinCode: action.payload.pinCode,
        phoneNo: action.payload.phoneNo,
      };
    },
  }
);
