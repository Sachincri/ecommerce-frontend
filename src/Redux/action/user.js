import { server } from "../store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });
    const { data } = await axios.get(`${server}/me`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const { data } = await axios.get(`${server}/logout`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });

    const { data } = await axios.post(`${server}/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: "registerSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({ type: "registerFail", payload: error.response.data.message });
  }
};
