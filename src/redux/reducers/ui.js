import { createReducer } from "@reduxjs/toolkit";
import {
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  STOP_LOADING_UI,
  SET_LOGIN_MODAL,
  UNSET_LOGIN_MODAL,
  SET_SUCCESS,
  UNSET_SUCCESS,
} from "../type";

const initialState = {
  loadingUi: true,
  error: null,
  success: null,
  showLoginModal: false,
};

const uiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOADING_UI, (state) => {
      state.loadingUi = true;
    })
    .addCase(STOP_LOADING_UI, (state) => {
      state.loadingUi = false;
    })
    .addCase(SET_ERRORS, (state, action) => {
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(SET_LOGIN_MODAL, (state) => {
      state.showLoginModal = true;
    })
    .addCase(UNSET_LOGIN_MODAL, (state) => {
      state.showLoginModal = false;
    })
    .addCase(SET_SUCCESS, (state, action) => {
      state.success = action.payload;
    })
    .addCase(UNSET_SUCCESS, (state) => {
      state.success = null;
    });
});
export default uiReducer;
