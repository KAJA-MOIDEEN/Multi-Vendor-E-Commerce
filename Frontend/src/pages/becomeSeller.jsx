import React, { useContext, useRef } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets.js';
import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';

const becomeSeller = () => {
  const inputRef = useRef(null);  
  const { profileImage, setProfileImage, token,backendUrl } = useContext(ShopContext);

  // Creating refs for form fields
  const companyRef = useRef(null);
  const panRef = useRef(null);
  const aadharRef = useRef(null);
  const gstRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => { 

    e.preventDefault();
    try {
      const formToSubmit = new FormData();
      formToSubmit.append('company', companyRef.current.value);
      formToSubmit.append('pan', panRef.current.value);
      formToSubmit.append('aadhar', aadharRef.current.value);
      formToSubmit.append('gst', gstRef.current.value);
      if (profileImage) {
        formToSubmit.append('becomeSeller', becomeSeller);
      }

      const response = await axios.put(`${backendUrl}/api/user/user-update`, formToSubmit, {headers: {token}});

      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <form onSubmit={handleSubmit} className="flex flex-col w-full sm:max-w-[480px] gap-4 mb-5">
        <div className="text-2xl">
          <Title text1="My" text2="Profile" />
        </div>

        {/* Profile Image Upload */}
        <div onClick={handleImageClick} className="cursor-pointer flex justify-center">
          {profileImage ? (
            <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-5" />
          ) : (
            <img src={assets.profile_icon} alt="Profile Icon" className="w-32 h-32 rounded-full object-contain" />
          )}
          <input className="hidden" type="file" onChange={handleImageChange} ref={inputRef} />
        </div>

        {/* Profile Form */}
        

        <InputField label="company" ref={companyRef} type="Company name" />
        <InputField label="pan" ref={panRef} type="email" placeholder="Enter your pan card number" />
        <InputField label="aadhar" ref={aadharRef} type="text" placeholder="Enter your aadhar numbar" />
        <InputField label="gst" ref={gstRef} type="text" placeholder="gst"/>        

        

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-5 w-full justify-center">
          <ActionButton label="Save" />
        </div>
      </form>
    </div>
  );
};

const InputField = React.forwardRef(({ label, type = 'text', placeholder }, ref) => (
  <div className="w-full mt-4">
    <label className="block mb-2">{label}</label>
    <input
      type={type}
      ref={ref}
      className="w-full px-5 py-2 border border-gray-800"
      placeholder={placeholder}
      required
    />
  </div>
));

const ActionButton = ({ label }) => (
  <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
    {label}
  </button>
);

export default becomeSeller;