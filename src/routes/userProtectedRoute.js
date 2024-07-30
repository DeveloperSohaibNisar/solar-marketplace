import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const CustomerProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.ui);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={`/auth/login`} replace />;
  }
  
  return children ? children : <Outlet />;
};

export default CustomerProtectedRoute;
