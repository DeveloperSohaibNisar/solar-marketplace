import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/styles';
import { Link, useNavigate } from 'react-router-dom';

const ShopInfo = ({ isOwner }) => {
  const [vendorCompany, setVendorCompany] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorData, setVendorData] = useState({ phoneNumber: '', createdAt: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const company = localStorage.getItem('vendorCompany');
    const email = localStorage.getItem('vendorEmail');
    setVendorCompany(company);
    setVendorEmail(email);

    if (email) {
      fetchVendorData(email);
    }
  }, []);

  const fetchVendorData = async (email) => {
    try {
      const response = await fetch(`/api/vendor/${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVendorData(data);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    }
  };

  const logoutHandler = async () => {
    navigate('/shop/logout', {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex item-center justify-center">
          <img
            src="../../../Assets/hub.jpg"
            className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3ad132]"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{vendorCompany}</h3>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Email</h5>
        <h4 className="text-[#000000a6]">{vendorEmail}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{vendorData.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">10</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">4/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">{vendorData.createdAt.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;