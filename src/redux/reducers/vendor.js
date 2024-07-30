import { createReducer } from "@reduxjs/toolkit";
import {
  LOADING_VENDOR,
  SET_VENDOR,
  STOP_LOADING_VENDOR,
  UNSET_VENDOR,
} from "../type";

const initialState = {
  loadingVendor: false,
  credentials: null,
};

const vendorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOADING_VENDOR, (state) => {
      state.loadingVendor = true;
    })
    .addCase(STOP_LOADING_VENDOR, (state) => {
      state.loadingVendor = false;
    })
    .addCase(SET_VENDOR, (state, action) => {
      state.credentials = action.payload;
    })
    .addCase(UNSET_VENDOR, (state) => {
      state.credentials = null;
    });
});
export default vendorReducer;
