import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/LoginPage.css";
import logo5 from "../assets/logo5.png";
import logincover from "../assets/cover.jpg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/user";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData, true));
  };

  // if (error) {
  //   toast.error(error);
  // }

  if (isAuthenticated) {
    switch (role) {
      case "vendor":
        return <Navigate to={`/vendor/dashboard`} replace />;
      case "customer":
        return <Navigate to={`/`} replace />;
      default:
        break;
    }
  }

  return (
    <div
      className="relative h-screen"
      style={{
        backgroundImage: `url(${logincover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link to="/">
        <img
          src={logo5}
          alt="Energy Matrix Logo"
          style={{
            height: "100px",
            width: "150px",
          }}
        />
      </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-semibold text-white">
          Welcome to <span style={{ color: "orange" }}>Energy Matrix!</span>
        </h2>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login to your account
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="login-container">
          <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="custom-button">
              Login
            </button>

            <div className="flex">
              <h4 style={{ marginRight: "8px", marginTop: "20px" }}>
                Don't have any account?
              </h4>
              <Link to="/auth/signup" className="text-blue-600 mt-5">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
