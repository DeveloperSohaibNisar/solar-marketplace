import { createReducer } from "@reduxjs/toolkit";
import {
  GET_ALL_ORDERS_SHOP_FAILED,
  GET_ALL_ORDERS_SHOP_REQUEST,
  GET_ALL_ORDERS_SHOP_SUCCESS,
  GET_ALL_ORDERS_USER_FAILED,
  GET_ALL_ORDERS_USER_REQUEST,
  GET_ALL_ORDERS_USER_SUCCESS,
} from "../type";

const initialState = {
  isLoading: true,
  orders: [],
};

const orderReducer = createReducer(initialState, (builder) => {
  builder
    // get all orders of user
    .addCase(GET_ALL_ORDERS_USER_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ALL_ORDERS_USER_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase(GET_ALL_ORDERS_USER_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // get all orders of shop
    .addCase(GET_ALL_ORDERS_SHOP_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ALL_ORDERS_SHOP_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase(GET_ALL_ORDERS_SHOP_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});

export default orderReducer;
