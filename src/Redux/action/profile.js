import { server } from "../store";
import axios from "axios";

export const updateProfile = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });
    const config = {
      headers: {
        "Content-type": "application/json",
      },

      withCredentials: true,
    };
    const { data } = await axios.put(
      `${server}/me/update`,
      {
        name,
        email,
      },
      config
    );

    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message,
    });
  }
};

export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "changePasswordRequest" });
      const config = {
        headers: {
          "Content-type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.put(
        `${server}/changepassword`,
        {
          oldPassword,
          newPassword,
        },
        config
      );

      dispatch({ type: "changePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "changePasswordFail",
        payload: error.response.data.message,
      });
    }
  };

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgetPasswordRequest" });

    const config = {
      headers: {
        "Content-type": "application/json",
      },

      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/password/forget`,
      {
        email,
      },
      config
    );

    dispatch({ type: "forgetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgetPasswordFail",
      payload: error.response.data.message,
    });
  }
};
export const addToWishList = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: "addToWishListRequest",
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },

      withCredentials: true,
    };
    const { data } = await axios.put(
      `${server}/addToWishList`,
      { productId },
      config
    );

    dispatch({
      type: "addToWishListSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addToWishListtFail",
      payload: error.response.data.message,
    });
  }
};
export const recentlyViewedProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: "recentlyViewedRequest",
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },

      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/recentlyViewed`,
      { productId },
      config
    );

    dispatch({
      type: "recentlyViewedSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "removeToWishListFail",
      payload: error.response.data.message,
    });
  }
};
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });
    const config = {
      headers: {
        "Content-type": "application/json",
      },

      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/resetpassword/${token}`,
      {
        password,
      },
      config
    );

    dispatch({ type: "resetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "resetPasswordFail",
      payload: error.response.data.message,
    });
  }
};
