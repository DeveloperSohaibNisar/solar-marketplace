import { createReducer } from "@reduxjs/toolkit";
import {
  LOADING_DATA,
  // SET_CATEGORIES,
  SET_DATA,
  // SET_PRODUCTS,
  STOP_LOADING_DATA,
  // UNSET_CATEGORIES,
  // UNSET_PRODUCTS,
} from "../type";

const initialState = {
  products: null,
  categories: null,
  loadingData: false,
  //   singlePost: null,
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOADING_DATA, (state) => {
      state.loadingData = true;
    })
    .addCase(STOP_LOADING_DATA, (state) => {
      state.loadingData = false;
    })
    .addCase(SET_DATA, (state, action) => {
      state.categories = action.payload.categories;
      state.products = action.payload.products;
    });
  // .addCase(SET_CATEGORIES, (state, action) => {
  //   state.categories = action.payload;
  // })
  // .addCase(UNSET_CATEGORIES, (state) => {
  //   state.categories = [];
  // })
  // .addCase(SET_PRODUCTS, (state, action) => {
  //   state.products = action.payload;
  // })
  // .addCase(UNSET_PRODUCTS, (state) => {
  //   state.products = [];
  // });
});
export default dataReducer;
