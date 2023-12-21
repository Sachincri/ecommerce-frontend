import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  {
    products: [],
    product: {},
  },
  {
    getAllProductsRequest: (state) => {
      state.loading = true;
    },
    getAllProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount= action.payload.productsCount;
      state.resultPerPage= action.payload.resultPerPage;
      state.filteredProductsCount= action.payload.filteredProductsCount;
    },
    getAllProductsFail: (state, action) => {
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
    },
    getProductDetailsRequest: (state) => {
      state.loading = true;
    },
    getProductDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },

    getProductDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newReviewRequest: (state) => {
      state.loading = true;
    },
    newReviewSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload;
    },
    newReviewFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);

// processPayment,
// sendStripeApiKey,
