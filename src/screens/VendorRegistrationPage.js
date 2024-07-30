import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo5 from "../assets/logo5.png";
import logincover from "../assets/cover3.jpg";
import "../styles/VendorRegistrationPage.css";
import { useDispatch, useSelector } from "react-redux";
import { signupVendor } from "../redux/actions/vendor";

const VendorRegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSelector((state) => state.user);

  const [companyName, setCompanyName] = useState("Electronics Hub");
  const [contactPersonName, setContactPersonName] = useState("Sohaib");
  const [contactEmail, setContactEmail] = useState("electronicshub@gmail.com");
  const [contactNumber, setContactNumber] = useState("+1 (555) 123-4567");
  const [companyAddress, setCompanyAddress] = useState(
    "1234 Solar Street, Renewable City, Sunshine State, Solarland"
  );
  const [businessLicense, setBusinessLicense] = useState(null);
  const [vatNumber, setVatNumber] = useState("");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [description, setDescription] = useState(
    "E-HUB is a comprehensive online platform dedicated to the solar energy sector. It serves as a hub for all things related to solar energy, catering to various stakeholders including consumers, solar industry professionals, and enthusiasts"
  );

  const handleRegistration = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (password !== confirmPassword) {
      toast.error("Passwords must match");
      return;
    }

    const vendorData = {
      companyName,
      contactPersonName,
      contactEmail,
      contactNumber,
      companyAddress,
      vatNumber,
      businessLicense,
      password,
      description,
    };

    dispatch(signupVendor(vendorData));
  };

  if (isAuthenticated && role === "vendor") {
    return <Navigate to={`/vendor/dashboard`} replace />;
  }

  return (
    <>
      <div
        className=" h-screen"
        style={{
          backgroundImage: `url(${logincover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 "></div>
        <div className="absolute inset-0 flex flex-col justify-center ">
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

          <div style={{ height: "100px" }}>
            <h2 className=" text-center text-4xl font-semibold text-white ">
              Welcome to <span style={{ color: "orange" }}>Energy Matrix!</span>
            </h2>
            <h2 className=" mt-6 text-center text-3xl font-extrabold text-white">
              Vendor Registration
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="registration-container">
              <form onSubmit={handleRegistration}>
                <div className="form-column left-column">
                  <label>Company Name:</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />

                  <label>Contact Person Name:</label>
                  <input
                    type="text"
                    value={contactPersonName}
                    onChange={(e) => setContactPersonName(e.target.value)}
                    required
                  />

                  <label>Contact Number:</label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />

                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <label>Business License (Upload):</label>
                  <input
                    type="file"
                    onChange={(e) => setBusinessLicense(e.target.files[0])}
                    accept="image/*"
                    required
                  />
                </div>

                <div className="form-column right-column">
                  <label>Company Address:</label>
                  <input
                    type="text"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    required
                  />

                  <label>Contact Person Email:</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />

                  <label>VAT Number (if applicable):</label>
                  <input
                    type="text"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                  />

                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label>Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div
                  style={{
                    paddingLeft: "250px",
                  }}
                >
                  <button type="submit" className="custom-button">
                    Submit
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",

                    marginTop: "20px",
                  }}
                >
                  <h4 style={{ marginRight: "8px" }}>
                    Already have an account?
                  </h4>
                  <Link to="/vendor-login" className="text-blue-600">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Display alert for error messages
      {errorMessage && (
        <div className="alert">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Close</button>
        </div>
      )} */}
    </>
  );
};

export default VendorRegistrationPage;
