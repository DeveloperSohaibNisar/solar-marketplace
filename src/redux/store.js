import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./reducers/cart";
import wishlistReducer from "./reducers/wishlist";
import { userReducer } from "./reducers/user";
import orderReducer from "./reducers/order";
import vendorReducer from "./reducers/vendor";
// import { productReducer } from "./reducers/product";
import uiReducer from "./reducers/ui";
import dataReducer from "./reducers/data";
const Store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    order: orderReducer,
    vendor: vendorReducer,
    // products: productReducer,
    ui: uiReducer,
    data: dataReducer,
  },
  devTools: true,
  // middleware: getDefaultMiddleware()
});
export default Store;
