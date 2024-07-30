import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { getVendorData } from "../redux/actions/vendor";
import { useEffect } from "react";

const SellerProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.user);
  const { loadingVendor, credentials } = useSelector((state) => state.vendor);

  useEffect(() => {
    const getData = () => {
      if (!isAuthenticated || role !== "vendor") return;
      dispatch(getVendorData());
    };
    getData();
  }, [dispatch, isAuthenticated, role]);

  if (!isAuthenticated) {
    return <Navigate to={`/auth/login`} replace />;
  }

  if (role !== "vendor") {
    return <Navigate to={`/`} replace />;
  }
  if (loadingVendor || !credentials) {
    return <Loader />;
  }

  return (
    <>
      {/* <Navigate to={`/vendor/dashboard`} replace /> */}
      {children ? children : <Outlet />}
    </>
  );
};

export default SellerProtectedRoute;
