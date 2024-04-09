import { server } from "../store";
import axios from "axios";

export const createProducts = (formData) => async (dispatch) => {

  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: "createProductsRequest" });

    const { data } = await axios.post(
      `${server}/admin/product/new`,
      formData,
      config
    );

    dispatch({ type: "createProductsSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAdminProductsRequest",
    });
    const { data } = await axios.get(`${server}/admin/products`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAdminProductsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAdminProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-type": "application/json",},
      withCredentials: true,
    };
    dispatch({ type: "updateProductRequest" });

    const { data } = await axios.put(
      `${server}/admin/product/${id}`,
      formData,
      config
    );

    dispatch({ type: "updateProductSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProductFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteProductRequest" });

    const { data } = await axios.delete(
      `${server}/admin/product/${id}`,
      config
    );

    dispatch({ type: "deleteProductSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "getAllUsersRequest" });

    const { data } = await axios.get(`${server}/admin/users`, config);

    dispatch({ type: "getAllUsersSuccess", payload: data.users });
  } catch (error) {
    dispatch({
      type: "getAllUsersFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "getAllOrdersRequest" });

    const { data } = await axios.get(`${server}/admin/orders`, config);

    dispatch({ type: "getAllOrdersSuccess", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "getAllOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const updateUserRole = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "updateUserRoleRequest" });

    const { data } = await axios.put(`${server}/admin/user/${id}`, {}, config);

    dispatch({ type: "updateUserRoleSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateUserRoleFail",
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getOrderDetailsRequest" });

    const { data } = await axios.get(`${server}/order/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: "getOrderDetailsSuccess", payload: data.order });
  } catch (error) {
    dispatch({
      type: "getOrderDetailsFail",
      payload: error.response.data.message,
    });
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: "updateOrderRequest" });

    const { data } = await axios.put(
      `${server}/admin/order/${id}`,
      order,
      config
    );
    dispatch({ type: "updateOrderSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteUserRequest" });

    const { data } = await axios.delete(`${server}/admin/user/${id}`, config);

    dispatch({ type: "deleteUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteUserFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteOrderRequest" });

    const { data } = await axios.delete(`${server}/admin/order/${id}`, config);

    dispatch({ type: "deleteOrderSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({
      type: "getUserDetailsRequest",
    });
    const { data } = await axios.get(`${server}/admin/user/${id}`, config);
  
    dispatch({
      type: "getUserDetailsSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "getUserDetailsFail",
      payload: error.response.data.message,
    });
  }
};
