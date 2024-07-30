import React, { useEffect } from "react";
import DashboardHeader from "../../components/shop/DashboardHeader";
import DashboardSideBar from "../../components/shop/DashboardSideBar";
import DashboardHero from "../../components/shop/DashboardHero";
import { useDispatch, useSelector } from "react-redux";
import { getVendorData } from "../../redux/actions/vendor";
import Loader from "../../components/Loader";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        {/* <DashboardHero /> */}
      </div>
    </div>
  );
};

export default ShopDashboardPage;
