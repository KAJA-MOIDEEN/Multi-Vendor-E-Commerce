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
      <div className="group relative z-50">
            <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile Icon" />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 p-4">
              <div className="flex flex-col gap-2 w-36 py-2 px-9 bg-slate-100 text-gray-500 rounded">
                <button><p className="cursor-pointer hover:text-black text-left ">My Profile</p></button>
                <button onClick={() => logout()} ><p className="cursor-pointer hover:text-black text-left">Logout</p></button>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Navbar;
