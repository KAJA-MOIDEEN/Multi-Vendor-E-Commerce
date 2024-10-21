import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const StatusToggleButton = ({ item, updateStatus }) => {
  const [isActive, setIsActive] = useState(item.status === 'active'); // Initial status

  const handleToggle = async () => {
    const newStatus = isActive ? 'inactive' : 'active'; // Toggle between active/inactive
    setIsActive(!isActive);
    await updateStatus(item._id, newStatus); // Call the function to update the status in the backend
  };

  return (
    <button
      onClick={handleToggle}
      className={`cursor-pointer text-lg px-4 py-2 rounded-full ${
        isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
};

const VendorsProducts = () => {
  const [list, setList] = useState([]);
  const {token} = useContext(AuthContext);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/update-status`,
        { id, status },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Status updated successfully!');
        await fetchList(); // Refresh the list after status update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

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
      <p className='mb-2'>Vendors List</p>
      <div className='flex flex-col gap-2 '>
        {/* ------List Table Title------- */}
        <div className='hidden md:grid grid-cols-[3fr_3fr_3fr_3fr_3fr_3fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Vendor Image</b>
          <b>Vendor Name</b>
          <b>Vendor Company</b>
          <b>Type of Products</b>
          <b className='text-center'>Status</b>
          <b className='text-center'>View</b>
        </div>

        {/* ------ Product  List ------- */}
        {list.map((item, index) => (
          <div
            className='grid grid-cols-[3fr_3fr_3fr_3fr_3fr_3fr] md:grid-cols-[3fr_3fr_3fr_3fr_3fr_3fr] items-center gap-2 py-1  px-2 border text-sm'
            key={index}
          >
            <img className='w-12' src={item.image[0]} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            
            {/* Pass the current item and updateStatus function to the StatusToggleButton */}
            <StatusToggleButton item={item} updateStatus={updateStatus} />

            <button onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default VendorsProducts;
