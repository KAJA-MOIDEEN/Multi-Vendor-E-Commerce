import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { assets } from "../assets/admin_assets/assets";

const StatusToggleButton = ({ item, updateStatus }) => {
  const [isActive, setIsActive] = useState(item.status === true); // Initial status

  const handleToggle = async () => {
    const newStatus = isActive ? false : true; // Toggle between active/inactive
    setIsActive(!isActive);
    await updateStatus(item._id, newStatus); // Call the function to update the status in the backend
  };

  return (
    <button
      onClick={handleToggle}
      className={`cursor-pointer text-xs px-4 py-2 w-auto rounded-full ${
        isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </button>
  );
};

const VendorsList = () => {
  const [list, setList] = useState([]);
  
  const { token } = useContext(AuthContext);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/vendor-details`,{headers:{token}});
      console.log(response.data);
      

      if (response.data.success) {
        setList(response.data.vendorDetails);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateStatus = async (_id, status) => {
    console.log(status);
    
    try {
      const response = await axios.post(`${backendUrl}/api/user/vendor-status`,{ _id, status },{ headers: { token } }
      );

      if (response.data.success) {
        toast.success("Status updated successfully!");
        await fetchList(); // Refresh the list after status update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeVendor = async (_id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/vendor/deleteVendor`,{ _id },{ headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">Vendors List</p>
      <div className="flex flex-col gap-2">
        {/* ------List Table Title------- */}
        <div className="hidden md:grid grid-cols-[3fr_3fr_3fr_3fr_1fr_2fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Vendor Image</b>
          <b>Vendor Name</b>
          <b>Vendor Company</b>
          <b>Type of Products</b>
          <b className="text-center">Status</b>
          <b className="text-center">View</b>
          <b className="text-center">Remove</b>
        </div>

        {/* ------ Product  List ------- */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[3fr_3fr_3fr_3fr_1fr_2fr_2fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.company}</p>
            <p>
              {item.email}
            </p>

            {/* Status Toggle */}
            <div className="text-center">
              <StatusToggleButton item={item} updateStatus={updateStatus} />
            </div>

            {/* View Icon */}
            
            <button className="flex justify-center cursor-pointer">
              <Link to= {"/vendorsView"}  state={{ item }}>
                <img className="w-6 h-6" src={assets.view_icon} alt="View" />
              </Link>
            </button>

            {/* Remove Button */}
            <button
              onClick={() => removeVendor(item._id)}
              className="flex justify-center cursor-pointer text-lg"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default VendorsList;
