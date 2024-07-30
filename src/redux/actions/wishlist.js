import { ADD_TO_WHISHLIST, REMOVE_FROM_WHISHLIST } from "../type";

// add to wishlist
export const addToWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TO_WHISHLIST, // Use the correct action type
    payload: data,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

// remove from wishlist
export const removeFromWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_WHISHLIST, // Use the correct action type
    payload: data.id,
  });
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};
