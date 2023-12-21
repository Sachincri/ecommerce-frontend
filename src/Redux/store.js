import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";
import { productReducer } from "./reducer/productReducer";
import { adminReducer } from "./reducer/adminReducer";
import { orderReducer, ordersReducer } from "./reducer/orderReducer";
import { profileReducer } from "./reducer/profileReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    admin: adminReducer,
    order: orderReducer,
    orders: ordersReducer,
    profile: profileReducer,
    product: productReducer,
  },
});

export default store;

// export const server = "https://ecommerce-sachin.vercel.app/api/v1";

export const server =  "http://localhost:5000/api/v1"