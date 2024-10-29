import React, { useState } from 'react'; 
import { assets } from '../assets/admin_assets/assets'; 
 
const Totalsalesview = () => { 
  const [search, setSearch] = useState(''); 

  return (
    <>
      <p className="mb-4 text-xl font-semibold text-gray-700 text-center sm:text-left">Total Sales</p>

      <div className="border-t border-b bg-gray-50 text-center py-3">
        <div className="flex items-center justify-center border border-gray-300 rounded-full px-4 py-2 shadow-sm w-full sm:w-1/2 lg:w-1/3 mx-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400 border-none"
            type="text"
            placeholder="Search for products..."
          />
          <button onClick={() => {}} className="flex items-center justify-center">
            <img className="w-4 ml-2 cursor-pointer" src={assets.search_icon} alt="Search" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 px-2 sm:px-4">
        {/* Sales Table Title */}
        <div className="grid grid-cols-4 sm:grid-cols-4 items-center py-2 px-3 border bg-gray-100 text-sm font-semibold text-gray-600 rounded-t-md shadow-sm">
          <span className="text-left">Product Name</span>
          <span className="text-center">Vendor Name</span>
          <span className="text-center">Quantity</span>
          <span className="text-right">Price</span>
        </div>

        {/* Total Row */}
        <div className="grid grid-cols-2 sm:grid-cols-[2fr_10fr] items-center py-2 px-3 border bg-gray-100 text-sm font-semibold text-gray-600 shadow-sm">
          <span className="text-left">Total</span>
          <span className="text-right sm:pr-40">Price</span>
        </div>

        {/* Sales List */}
        {[].map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 sm:grid-cols-4 items-center py-2 px-3 border-b hover:bg-gray-50 text-sm text-gray-700 rounded-md shadow-sm transition duration-200"
          >
            <span className="text-left">{item.productName}</span>
            <span className="hidden sm:block text-center">{item.vendorName}</span>
            <span className="text-center">{item.quantity}</span>
            <span className="text-right">{item.price}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Totalsalesview;
