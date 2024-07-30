import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  HomePage,
  VendorRegistrationPage,
  // VendorLoginPage,
  ProductPage,
  SolarPackagesPage,
  SolarDetailsPage,
  ContactPage,
  FaqPage,
  CheckoutPage,
  PaymentPage,
  ProductDetailsPage,
  ProfilePage,
  OrderDetailsPage,
  TrackOrderPage,
  OrderSuccessPage,
} from "./routes/Routes.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { ShopHomePage } from "./ShopRoutes.js";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopAllCoupons,
  ShopAllOrderDetails,
  ShopAllOrders,
  ShopAllRefunds,
} from "./routes/ShopRoute.js";
import {
  CLEAR_ERRORS,
  LOAD_SELLER_REQUEST,
  LOAD_SELLER_SUCCESS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  STOP_LOADING_UI,
  UNSET_SUCCESS,
} from "./redux/type.js";
import VendorProtectedRoute from "./routes/vendorProtectedRoute.js";
import UserProtectedRoute from "./routes/userProtectedRoute.js";
import { useDispatch, useSelector } from "react-redux";
import supabase from "./supabaseClient.js";
import LoginView from "./components/LoginView.js";

import store from "./redux/store.js";
import Loader from "./components/Loader.js";
// import { getCategories, getData, getProducts } from "./redux/actions/data.js";
import { getData } from "./redux/actions/data.js";

await supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    store.dispatch({
      type: SET_AUTHENTICATED,
      payload: session.user,
    });
  } else {
    store.dispatch({ type: SET_UNAUTHENTICATED });
  }
  store.dispatch({ type: STOP_LOADING_UI });
});

const App = () => {
  const dispatch = useDispatch();
  const { error, success, loadingUi } = useSelector((state) => state.ui);
  const { loadingData, products, categories } = useSelector(
    (state) => state.data
  );
  // const isLoading = useSelector((state) => state.seller.isLoading);
  const { showLoginModal } = useSelector((state) => state.ui);
  // const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");
  // useEffect(() => {
  //   // Dispatch "LoadSellerRequest" action when component mounts
  //   dispatch({ type: LOAD_SELLER_REQUEST });

  //   // Simulate the user being recognized as a seller
  //   setTimeout(() => {
  //     dispatch({
  //       type: LOAD_SELLER_SUCCESS,
  //       payload: {
  //         id: 1,
  //         name: "Electronics Hub",
  //         email: "electronicshub@gmail.com",
  //         description:
  //           "E-HUB is a comprehensive online platform dedicated to the solar energy sector. It serves as a hub for all things related to solar energy, catering to various stakeholders including consumers, solar industry professionals, and enthusiasts",
  //         address:
  //           "1234 Solar Street, Renewable City, Sunshine State, Solarland",
  //         phoneNumber: "+1 (555) 123-4567",
  //         createdAt: "2023-03-15",
  //       },
  //     });
  //   }, 2000); // Simulating a delay of 2 seconds

  //   // Add event listener to clear local storage when the browser is closed
  //   window.addEventListener("beforeunload", clearLocalStorage);

  //   return () => {
  //     // Remove event listener when the component unmounts
  //     window.removeEventListener("beforeunload", clearLocalStorage);
  //   };
  // }, [dispatch]);

  // // Function to clear local storage
  // const clearLocalStorage = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   localStorage.removeItem("email");
  //   localStorage.removeItem("fullName");
  // };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (success) {
    toast.success(success);
    dispatch({ type: UNSET_SUCCESS });
  }

  if (error) {
    toast.error(error);
    dispatch({ type: CLEAR_ERRORS });
  }

  if (loadingData || !products || !categories) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      {/* <Elements stripe={stripePromise}> */}
      {loadingUi && <Loader />}
      {showLoginModal && <LoginView />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1>404 not found</h1>} />

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route
          path="/auth/vendor/signup"
          element={<VendorRegistrationPage />}
        />

        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/solar-packages" element={<SolarPackagesPage />} />
        <Route path="/solar-package/:id" element={<SolarDetailsPage />} />
        <Route path="/contactUs" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />

        <Route path="/user" element={<UserProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="track/order/:id" element={<TrackOrderPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="order/success" element={<OrderSuccessPage />} />
        </Route>

        {/* Vendor Routes */}
        <Route path="/vendor/:id" element={<ShopHomePage />} />

        <Route path="/vendor" element={<VendorProtectedRoute />}>
          <Route path="dashboard" element={<ShopDashboardPage />} />
          <Route path="dashboard-orders" element={<ShopAllOrders />} />
          <Route path="dashboard-refunds" element={<ShopAllRefunds />} />
          <Route
            path="dashboard-orders/:id"
            element={<ShopAllOrderDetails />}
          />
          <Route
            path="dashboard-create-product"
            element={<ShopCreateProduct />}
          />
          <Route path="dashboard-products" element={<ShopAllProducts />} />
          <Route path="dashboard-coupons" element={<ShopAllCoupons />} />
        </Route>
        {/* Shop routes */}
      </Routes>

      {/* </Elements> */}
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
