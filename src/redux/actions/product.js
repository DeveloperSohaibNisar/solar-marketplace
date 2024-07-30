import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
//   CLEAR_ERRORS,
  GET_ALL_PRODUCTS_SHOP_REQUEST,
  GET_ALL_PRODUCTS_SHOP_SUCCESS,
  GET_ALL_PRODUCTS_SHOP_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
} from "../type";

// Action to create a product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });

    // Simulate a delay to mimic the time taken for an HTTP request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock response data for the created product
    const createdProduct = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      ...Object.fromEntries(newForm.entries()),
    };

    // Dispatch an action to update the Redux store with the created product
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: createdProduct.product,
    });

    // Store the created product data in local storage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    localStorage.setItem(
      "products",
      JSON.stringify([...storedProducts, createdProduct])
    );
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Failed to create product.",
    });
  }
};

export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PRODUCTS_SHOP_REQUEST,
    });

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    setTimeout(() => {
      dispatch({
        type: GET_ALL_PRODUCTS_SHOP_SUCCESS,
        payload: storedProducts,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_SHOP_FAILED,
      payload: error.message,
    });
  }
};

// delete product of a shop

export const deleteProduct = (id) => (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    // Simulate a delay to mimic an asynchronous operation
    setTimeout(() => {
      // Retrieve products from local storage
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      // Filter out the product to be deleted
      const updatedProducts = storedProducts.filter(
        (product) => product.id !== id
      );
      // Update local storage with the updated product list
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: "Product deleted successfully.",
      });
    }, 1000); // Adjust the delay as needed
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILED,
      payload: error.message || "Failed to delete product.",
    });
  }
};
