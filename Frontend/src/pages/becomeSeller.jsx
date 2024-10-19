import React, { useContext, useRef } from 'react';
import Title from '../components/Title';
import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';

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
      const formToSubmit = new FormData();
      formToSubmit.append('company', companyRef.current.value);
      formToSubmit.append('pan', panRef.current.value);
      formToSubmit.append('aadhar', aadharRef.current.value);
      formToSubmit.append('gst', gstRef.current.value);

      const response = await axios.put(`${backendUrl}/api/user/user-update`, formToSubmit, { headers: { token } });

      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <form onSubmit={handleSubmit} className="flex flex-col w-full sm:max-w-[480px] gap-4 mb-5 bg-white p-5 rounded-lg shadow-md">
        <div className="text-2xl text-center">
          <Title text1="Become a" text2="Seller" />
        </div>

        {/* Profile Form */}
        <InputField label="Company Name" ref={companyRef} placeholder="Enter your company name" />
        <InputField label="PAN Number" ref={panRef} placeholder="Enter your PAN card number" />
        <InputField label="Aadhar Number" ref={aadharRef} placeholder="Enter your Aadhar number" />
        <InputField label="GST Number" ref={gstRef} placeholder="Enter your GST number" />

        {/* Action Button */}
        <div className="flex justify-center">
          <ActionButton label="Save" />
        </div>
      </form>
    </div>
  );
};

const InputField = React.forwardRef(({ label, placeholder }, ref) => (
  <div className="w-full mt-4">
    <label className="block mb-2">{label}</label>
    <input
      type="text"
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
