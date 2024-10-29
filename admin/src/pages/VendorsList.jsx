
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext"; 
import { assets } from "../assets/admin_assets/assets"; 
import { Switch } from "@material-tailwind/react"; 

const VendorsList = () => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendorToRemove, setVendorToRemove] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/vendor-details`, { headers: { token } });
      if (response.data.success) {
        setList(response.data.vendorDetails);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const updateStatus = async (_id, status) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/vendor-status`, { _id, status }, { headers: { token } });
      if (response.data.success) {
        toast.success("Status updated successfully!");
        fetchList(); // Refresh the list after status update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeVendor = async (_id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/vendor/deleteVendor`, { _id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsModalOpen(false); // Close modal after attempt
    }
  };

  const confirmRemoveVendor = (vendorId) => {
    setVendorToRemove(vendorId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (vendorToRemove) removeVendor(vendorToRemove);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">Vendors List</p>
      <div className="flex flex-col gap-2">
        
        {/* ------ List Table Header ------- */}
        <div className="hidden md:grid grid-cols-[2fr_2fr_3fr_3fr_1fr_2fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Vendor Image</b>
          <b>Vendor Name</b>
          <b>Vendor Company</b>
          <b>Type of Products</b>
          <b className="text-center">Status</b>
          <b className="text-center">View</b>
          <b className="text-center">Remove</b>
        </div>

        {/* ------ Vendors List ------- */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[2fr_2fr_3fr_3fr_1fr_2fr_2fr] items-center py-1 px-2 border text-sm"
            key={item._id}
          >
            <img className="w-12 h-12" src={item.image} alt="Vendor" />
            <p>{item.name}</p>
            <p>{item.company}</p>
            <p>{item.email}</p>

            {/* Status Toggle using Switch */}
            <p className="pl-4">
              <Switch
                id={`status-${index}`}
                checked={item.status}
                onChange={() => updateStatus(item._id, !item.status)}
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{ className: "w-11 h-6" }}
                circleProps={{ className: "before:hidden left-0.5 border-none" }}
              />
            </p>

            {/* View Icon */}
            <button className="flex justify-center cursor-pointer">
              <Link to={"/vendorsView"} state={{ item }}>
                <img className="w-6 h-6" src={assets.view_icon} alt="View" />
              </Link>
            </button>

            {/* Remove Button with Confirmation */}
            <button
              onClick={() => confirmRemoveVendor(item._id)}
              className="flex justify-center cursor-pointer text-lg hover:text-red-600"
            >
              X
            </button>
          </div>
        ))}

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm mx-auto">
              <p className="text-lg">Are you sure you want to remove this vendor?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VendorsList;

