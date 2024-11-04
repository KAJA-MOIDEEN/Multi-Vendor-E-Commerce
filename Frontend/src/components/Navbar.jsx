import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets.js';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '@/context/ShopContext.jsx';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(true); // Track scrolling direction
  const [scrolled, setScrolled] = useState(false); // Track if scrolled down
  const { setShowSearch, getCartCount, setToken, token, navigate, setUserProfile } = useContext(ShopContext);

  const handleToggle = (value) => {
    token
      ? value === "MyProfile"
        ? navigate("/my-profile")
        : value === "Orders"
        ? navigate("/orders")
        : toast.error("Invalid navigation option")
      : value === "MyProfile"
      ? toast.error("Please login to view your profile")
      : value === "Orders"
      ? (toast.error("Please login to view your orders"), navigate("/login"))
      : toast.error("Please login to continue");
  };

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      setToken("");
      console.log(token, "token", localStorage.getItem("token"));
      toast.success("Logout successfully");
      setUserProfile({});
      navigate("/login");
    } else {
      toast.error("Please login to view your orders");
      console.log("here");
      navigate("/login");
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  // Handle scroll events
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // Check if the user has scrolled down
      setScrolled(window.scrollY > 0);

      if (window.scrollY < lastScrollY) {
        setScrollingUp(true); // User is scrolling up
      } else {
        setScrollingUp(false); // User is scrolling down
      }
      lastScrollY = window.scrollY; // Update the last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup listener
    };
  }, []);

  return (
    <>
      <div className={`w-full bg-white flex items-center justify-between px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] fixed z-30  transition-transform ${scrollingUp ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'shadow-lg' : ''}`}>
        {/* logo */}
        <div className="flex items-center justify-between py-5 font-medium">
          <Link to="/"><img src={assets.logo} className="w-36" alt="Logo" /></Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* Actions */}
        <div className="flex items-center gap-6">
          <NavLink to="/collection">
            <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="Search Icon" />
          </NavLink>

          {/* Profile & Cart Section */}
          <div className="group relative">
            <img onClick={() => {
              if (!token) {
                navigate("/login");
              }
            }} className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile Icon" />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 p-4">
              <div className="flex flex-col gap-2 w-36 py-2 px-9 bg-slate-100 text-gray-500 rounded">
                <button onClick={() => handleToggle("MyProfile")}><p className="cursor-pointer hover:text-black text-left ">My Profile</p></button>
                <button onClick={() => handleToggle("Orders")}><p className="cursor-pointer hover:text-black text-left">Orders</p></button>
                {token ? <button onClick={handleLogout}><p className="cursor-pointer hover:text-black text-left">Logout</p></button> : "" }
              </div>
            </div>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart Icon" />
            <p className="absolute right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu Icon"
          />
        </div>

        {/* Sidebar Menu for Small Screens */}
        <div className={`flex flex-col absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back Icon" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">About</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">Contact</NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
