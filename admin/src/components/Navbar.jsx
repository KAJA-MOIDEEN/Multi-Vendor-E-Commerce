import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from "../assets/admin_assets/assets.js";
import { toast } from 'react-toastify';

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

  const logout = async() => {
    toast("Logged out successfully!");
    // Remove the token from localStorage
    localStorage.removeItem("token"); 
    setToken(false);
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80Px)]' src={assets.logo} alt='Logo' />
      <div className='flex items-center'>
        <button 
          onClick={()=>logout()} 
          className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
