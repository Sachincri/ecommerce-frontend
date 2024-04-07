import { createReducer } from "@reduxjs/toolkit";

export const profileReducer = createReducer(
  {},
  {
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addToWishListRequest: (state) => {
      state.loading = true;
    },
    addToWishListSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToWishListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    recentlyViewedRequest: (state) => {
      state.loading = true;
    },
    recentlyViewedSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    recentlyViewedtFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    changePasswordRequest: (state) => {
      state.loading = true;
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    changePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forgetPasswordRequest: (state) => {
      state.loading = true;
    },
    forgetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMyorderRequest: (state) => {
      state.loading = true;
    },
    getMyorderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    getMyorderFail: (state, action) => {
      state.loading = false;
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
