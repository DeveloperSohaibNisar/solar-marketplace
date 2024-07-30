import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/SignupPage.css"; // Create a new CSS file for SignupPage styles
import logo5 from "../assets/logo6.png";
import logincover from "../assets/cover2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/user";
import { toast } from "react-toastify";

const SignupPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated ,role} = useSelector((state) => state.user);

  const { error } = useSelector((state) => state.ui);
  const [name, setName] = useState("sohaib");
  const [email, setEmail] = useState("sohaib@gmail.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (password !== confirmPassword) {
      toast.error("Passwords must match");
      return;
    }
    const userData = {
      name,
      email,
      password,
    };
    dispatch(signupUser(userData));
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
      className="relative h-screen "
      style={{
        backgroundImage: `url(${logincover})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 "></div>
      <div className="absolute inset-0 flex flex-col justify-center">
        <Link to="/">
          <img
            src={logo5}
            alt="Energy Matrix Logo"
            style={{
              height: "70px",
              width: "110px",
              marginTop: "0px",
            }}
          />
        </Link>
        <h2 className=" text-center text-3xl font-semibold text-white">
          Welcome to <span style={{ color: "orange" }}>Energy Matrix!</span>
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="signup-container">
            <h4 className=" text-center text-2xl font-bold text-black">
              Create your account
            </h4>

            <form onSubmit={handleSignup}>
              <label>Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

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

              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" className="custom-button">
                Sign Up
              </button>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                }}
              >
                <h4 style={{ marginRight: "8px" }}>Already have an account?</h4>
                <Link to="/auth/login" className="text-blue-600">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
