import { createReducer } from "@reduxjs/toolkit";
import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  STOP_LOADING_USER,
} from "../type";

const initialState = {
  isAuthenticated: false,
  loading: false,
  credentials: null,
  role: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_AUTHENTICATED, (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.user_metadata.role;
      state.credentials = { ...action.payload };
    })
    .addCase(SET_UNAUTHENTICATED, (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.credentials = null;
    })
    .addCase(LOADING_USER, (state) => {
      state.loading = true;
    })
    .addCase(STOP_LOADING_USER, (state) => {
      state.loading = false;
    })
    .addCase(SET_USER, (state, action) => {
      state.credentials = action.payload;
    });
});
