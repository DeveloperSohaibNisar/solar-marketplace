import supabase from "../../supabaseClient";
import {
  LOADING_DATA,
  // SET_CATEGORIES,
  SET_DATA,
  SET_ERRORS,
  // SET_PRODUCTS,
  STOP_LOADING_DATA,
} from "../type";

// export const getCategories = () => async (dispatch) => {
//   dispatch({ type: LOADING_DATA });
//   try {
//     let { data, error } = await supabase.from("categories").select("*");

//     if (error) {
//       throw error;
//     }

//     dispatch({
//       type: SET_CATEGORIES,
//       payload: data,
//     });

//     dispatch({ type: STOP_LOADING_DATA });
//   } catch (error) {
//     dispatch({
//       type: SET_ERRORS,
//       payload: error.message || "something went wrong",
//     });
//   }
// };

// export const getProducts = () => async (dispatch) => {
//   dispatch({ type: LOADING_DATA });
//   try {
//     let { data, error } = await supabase.from("products").select("*");

//     if (error) {
//       throw error;
//     }

//     dispatch({
//       type: SET_PRODUCTS,
//       payload: data,
//     });
//     dispatch({ type: STOP_LOADING_DATA });
//   } catch (error) {
//     dispatch({
//       type: SET_ERRORS,
//       payload: error.message || "something went wrong",
//     });
//   }
// };

export const getData = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  const promise = [
    supabase.from("products").select(`*,vendors(name)`),
    supabase.from("categories").select("*"),
  ];

  try {
    const resolved = await Promise.all(promise);
    resolved.forEach(({ error }) => {
      if (error) {
        throw error;
      }
    });
    dispatch({
      type: SET_DATA,
      payload: {
        products: resolved[0].data,
        categories: resolved[1].data,
      },
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message || "something went wrong",
    });
  } finally {
    dispatch({ type: STOP_LOADING_DATA });
  }
};
