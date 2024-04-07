import { server } from "../store";
import axios from "axios";

export const addToCart =
  (id, quantity = 1) =>
  async (dispatch, state) => {
    const { data } = await axios.get(`${server}/product/${id}`);

    dispatch({
      type: "addToCart",
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        cuttedPrice: data.product.cuttedPrice,
        discount: data.product.discount,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
      },
    });
    localStorage.setItem("cartItems", JSON.stringify(state().cart.cartItems));
  };

export const removeFromCart = (id) => async (dispatch, state) => {
  dispatch({
    type: "removeFromCart",
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(state().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: "shippingInfo",
    payload: { data },
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
