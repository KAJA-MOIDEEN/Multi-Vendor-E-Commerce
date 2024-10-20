import React, { useContext, useRef } from 'react';
import Title from '../components/Title';
import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const BecomeSeller = () => {
  const { token, backendUrl } = useContext(ShopContext); 

  // Creating refs for form fields 
  const companyRef = useRef(null); 
  const panRef = useRef(null);
  const aadharRef = useRef(null);
  const gstRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data to send
      const data = {
        company: companyRef.current.value,
        pan: panRef.current.value,
        aadhar: aadharRef.current.value,
        GST: gstRef.current.value
      };

      const response = await axios.post(`${backendUrl}/api/user/seller-register`, data, {headers: {token}});
      toast.success(response.data.message);

      setTimeout(() => {
        toast(response.data.waiting_MSG)
      }, 5000);

    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <form onSubmit={handleSubmit} className="flex flex-col w-full sm:max-w-[480px] gap-4 mb-5 bg-white p-5 rounded-lg shadow-md">
        <div className="text-2xl text-center">
          <Title text1="BECOME A" text2="SELLER" />
        </div>

        {/* Profile Form */}
        <InputField label="Company Name" ref={companyRef} placeholder="Enter your company name" type='text' />
        <InputField label="PAN Number" ref={panRef} placeholder="Enter your PAN card number" type='text' />
        <InputField label="Aadhar Number" ref={aadharRef} placeholder="Enter your Aadhar number" type='text' maxLength={12} />
        <InputField label="GST Number" ref={gstRef} placeholder="Enter your GST number" type='text' />

        {/* Action Button */}
        <div className="flex justify-center">
          <ActionButton label="Save" />
        </div>
      </form>
    </div>
  );
};

const InputField = React.forwardRef(({ label, placeholder, type }, ref) => (
  <div className="w-full mt-4">
    <label className="block mb-2">{label}</label>
    <input
      type={type}
      ref={ref}
      className="w-full px-5 py-2 border border-gray-800 rounded"
      placeholder={placeholder}
      required
    />
  </div>
));

const ActionButton = ({ label }) => (
  <button type="submit" className="bg-black text-white font-light px-8 py-2 rounded mt-4">
    {label}
  </button>
);

export default BecomeSeller; 
