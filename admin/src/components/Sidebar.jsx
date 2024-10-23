import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets.js'
import { AuthContext } from '../context/AuthContext.jsx'

const Sidebar = () => {
const {role} = useContext(AuthContext);
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[90%]'>
        <NavLink className="flex items-center gap-3 border border-gray-300 boroder-r-0 px-3 py-3 rounded-l" to="/">
        <img className='w-5 h-5' src={assets.add_icon}/>
        <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink className="flex items-center gap-3 border border-gray-300 boroder-r-0 px-3 py-3 rounded-l" to="/list">
        <img className='w-5 h-5' src={assets.order_icon}/>
        <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink className="flex items-center gap-3 border border-gray-300 boroder-r-0 px-3 py-3 rounded-l" to="/orders">
        <img className='w-5 h-5' src={assets.order_icon}/>
        <p className='hidden md:block'>Orders</p>
        </NavLink>

        {role === "Admin" ? <NavLink className="flex items-center gap-3 border border-gray-300 boroder-r-0 px-3 py-3 rounded-l" to="/vendor-list">
        <img className='w-5 h-5' src={assets.profile_icon}/>
        <p className='hidden md:block'>Vendors</p>
        </NavLink> : ""}
        </div>
    </div>
  )
}

export default Sidebar