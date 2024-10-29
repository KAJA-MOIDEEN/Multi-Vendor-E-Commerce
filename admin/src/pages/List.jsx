

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

// Modal component
const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Main List component
const List = () => {
  const { token, role } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);

  // Fetch list based on user role
  const fetchList = async () => {
    try {
      const url = role === 'Vendor' ? '/api/vendor/vendorProduct' : '/api/product/list';
      const response = await axios.get(`${backendUrl}${url}`, { headers: { token } });

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Show modal and set product to be removed
  const handleRemoveClick = (id) => {
    setProductIdToRemove(id);
    setIsModalOpen(true);
  };

  // Confirm removal
  const handleConfirmRemove = async () => {
    setIsModalOpen(false);
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id: productIdToRemove }, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="text-xl font-semibold mb-4">All Products List</p>
      
      <div className="flex flex-col gap-4">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-6 items-center py-3 px-4 bg-gray-100 border border-gray-200 rounded-md text-sm font-semibold text-gray-700">
          <span>Image</span>
          <span>Name</span>
          <span>Seller</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[auto_1fr_auto] md:grid-cols-6 items-center gap-4 py-3 px-4 bg-white border border-gray-200 rounded-md shadow-sm text-sm"
          >
            <img className="w-16 h-16 object-cover rounded-md" src={item.image[0]} alt={item.name} />
            <p className="truncate">{item.name}</p>
            <p className="truncate hidden md:block">{item.sellerCompany}</p>
            <p className="truncate hidden md:block">{item.category}</p>
            <p className="truncate font-medium text-gray-800">{currency}{item.price}</p>
            <button
              onClick={() => handleRemoveClick(item._id)}
              className="text-red-500 hover:text-red-700 transition text-center text-lg"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmRemove}
        onCancel={() => setIsModalOpen(false)}
        message="Are you sure you want to remove this product?"
      />
    </>
  );
};

export default List;

