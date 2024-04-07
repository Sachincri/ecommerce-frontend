import axios from "axios";
import { server } from "../store";

export const getAllProducts =
  (
    keyword = "",
    currentPage,
    price = [0, 250000],
    category,
    ratings = 0,
    discount = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "getAllProductsRequest",
      });

      let api = `${server}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        api = `${server}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}
        `;
      }

      if (discount) {
        api = `${server}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&discount=${discount}
        `;
      }

      const { data } = await axios.get(api, {
        withCredentials: true,
      });

      dispatch({
        type: "getAllProductsSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "getAllProductsFail",
        payload: error.response.data.message,
      });
    }
  };

export const getSimilarProducts = (category) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });
    const { data } = await axios.get(
      `${server}/products?category=${category}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "getAllProductsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFail",
      payload: error.response.data.message,
    });
  }
};
export const getRecentlyViewed = () => async (dispatch) => {
  try {
    dispatch({
      type: "getRecentlyViewedRequest",
    });
    const { data } = await axios.get(`${server}/getRecentlyViewedProduct`, {
      withCredentials: true,
    });
    dispatch({
      type: "getRecentlyViewedSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getRecentlyViewedFail",
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductDetailsRequest",
    });
    const { data } = await axios.get(`${server}/product/${id}`);

    dispatch({
      type: "getProductDetailsSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getProductDetailsFail",
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: "newReviewRequest",
    });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(`${server}/review`, reviewData, config);

    dispatch({
      type: "newReviewSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({ type: "newReviewFail", payload: error.response.data.message });
  }
};

export const getAllReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllReviewRequest",
    });

    const { data } = await axios.get(`${server}/review${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({
      type: "getAllReviewSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "getAllReviewFail",
      payload: error.response.data.message,
    });
  }
};
