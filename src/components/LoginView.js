import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/user";
import { toast } from "react-toastify";
import { UNSET_LOGIN_MODAL } from "../redux/type";

const LoginView = ({ setOpen, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.ui);

  const handleClose = () => {
    dispatch({
      type: UNSET_LOGIN_MODAL,
    }); // Close the LoginView modal
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData, true));
    handleClose();
  };

  // if (error) {
  //   toast.error(error);
  // }

  return (
    <div className="bg-[#fff]">
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
        <div className="w-[40%] 800px:w-[35%] overflow-y-auto bg-white rounded-md shadow-sm relative p-4">
          <div className="absolute cursor-pointer right-3 top-3 z-50 p-2 bg-[#efefef]">
            <RxCross1
              size={25}
              onClick={handleClose} // Modified onClick handler
            />
          </div>
          <div className="block w-full flex mt-2">
            <div className="text-center mx-auto">
              <h2 className="text-2xl font-bold text-Black">
                Login to your account
              </h2>
              <div className="w-[90%] mx-auto my-8">
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
                </form>
                <div className="flex justify-center my-8">
                  <h4>Don't have any account?</h4>
                  <Link to="/auth/signup" className="text-blue-600 ml-1">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
