import React, { useContext } from 'react';
import { assets } from "../assets/admin_assets/assets.js";
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const {setToken, role} = useContext(AuthContext);

  const logout = async() => {
    toast("Logged out successfully!");
    // Remove the token from localStorage
    localStorage.removeItem("token"); 
    setToken(false);
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80Px)]' src={role === "Vendor" ? assets.Vendor_logo : assets.Admin_logo} alt='Logo' />
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
