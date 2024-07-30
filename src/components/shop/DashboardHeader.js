import React from "react";
import { Link } from "react-router-dom";
import logo5 from "../../assets/logo5.png";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const vendor = useSelector((state) => state.vendor);
  return (
    <div className="w-full h-[90px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/vendor/dashboard">
          <img
            src={logo5}
            alt="logo"
            style={{
              height: "80px",
              width: "120px",
            }}
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link
            to="/vendor/dashboard-coupons"
            className="800px:block hidden"
            title="Coupons"
          >
            <AiOutlineGift
              color="#555"
              size={26}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            to="/vendor/dashboard-products"
            className="800px:block hidden"
            title="Products"
          >
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link
            to="/vendor/dashboard-orders"
            className="800px:block hidden"
            title="Orders"
          >
            <FiShoppingBag
              color="#555"
              size={26}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            to="/vendor/dashboard-messages"
            className="800px:block hidden"
            title="Message"
          >
            <BiMessageSquareDetail
              color="#555"
              size={26}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/vendor/${vendor.credentials.id}`} title="Profile">
            <img
              src="../../../Assets/hub.jpg"
              className="w-[50px] h-[50px] rounded-full object-cover"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
