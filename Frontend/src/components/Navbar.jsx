import React, { useContext, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets.js';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '@/context/ShopContext.jsx';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch , getCartCount} =  useContext(ShopContext);
  return (
    <>
    <div className='flex items-center justify-between'>
      {/* logo */}
      <div className="flex items-center justify-between py-5 font-medium">
        <Link to='/'><img src={assets.logo} className="w-36" alt="Logo" /></Link>
      </div> 

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1 hover:text-black">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hover:block hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1 hover:text-black">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hover:block hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1 hover:text-black">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hover:block hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1 hover:text-black">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hover:block hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <NavLink to={"/collection"}><img onClick={()=>setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="Search Icon" /></NavLink>
        <div className="group relative">
          <Link to={'/Login'}><img className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile Icon" /></Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 p-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <Link to= {'/UserProfile'}><p className="cursor-pointer hover:text-black">My Profile</p></Link>
             <Link to ={'/Orders'}><p className="cursor-pointer hover:text-black">Orders</p> </Link>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart Icon" />
          <p className="absolute right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
          {/* show cart count here */}
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu Icon"
        />
      </div>

      {/* sidebar menu for small screen */}
      <div className={`flex flex-col absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
          <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back Icon" />
          <p>Back</p>
        </div>
        <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
          Home
        </NavLink>
        <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/Collection">
          Collection
        </NavLink>
        <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/About">
          About
        </NavLink>
        <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/Contact">
          Contact
        </NavLink>
      </div>
    </div>
    </>
  );
};

export default Navbar;
