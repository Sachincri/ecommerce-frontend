import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer(
  {
    users: [],
    user: {},
    products: [],
  },
  {
    getAllUsersRequest: (state) => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAdminProductsRequest: (state) => {
      state.loading = true;
    },
    getAdminProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.inStock = action.payload.inStock;
      state.outOfStock = action.payload.outOfStock;
      state.productsCount = action.payload.productsCount;
    },
    getAdminProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRoleRequest: (state) => {
      state.loading = true;
    },
    updateUserRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateUserRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderRequest: (state) => {
      state.loading = true;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderRequest: (state) => {
      state.loading = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductsRequest: (state) => {
      state.loading = true;
    },
    createProductsSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllOrdersRequest: (state) => {
      state.loading = true;
    },
    getAllOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getAllOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserDetailsRequest: (state) => {
      state.loading = true;
    },
    getUserDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
