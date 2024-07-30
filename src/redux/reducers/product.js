import { createReducer } from "@reduxjs/toolkit";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CLEAR_ERRORS,
  GET_ALL_PRODUCTS_SHOP_REQUEST,
  GET_ALL_PRODUCTS_SHOP_SUCCESS,
  GET_ALL_PRODUCTS_SHOP_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
} from "../type";

const initialState = {
  isLoading: true,
  products: [],
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE_PRODUCT_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(CREATE_PRODUCT_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    })
    .addCase(CREATE_PRODUCT_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })

    // get all product of shop

    .addCase(GET_ALL_PRODUCTS_SHOP_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ALL_PRODUCTS_SHOP_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    })
    .addCase(GET_ALL_PRODUCTS_SHOP_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // delete
    .addCase(DELETE_PRODUCT_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(DELETE_PRODUCT_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase(DELETE_PRODUCT_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
