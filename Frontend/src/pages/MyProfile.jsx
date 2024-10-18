import React, { useContext, useRef } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets.js';
import { ShopContext } from '@/context/ShopContext';

const MyProfile = () => {
  const inputRef = useRef(null); 
  const { profileImage, setProfileImage } = useContext(ShopContext);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      
      <div className="flex flex-col w-full sm:max-w-[480px] gap-4 mb-5">
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
        <div className="flex flex-col sm:flex-row sm:space-x-5 w-full">
          <InputField label="First Name" id="FirstName" placeholder="First Name" />
          <InputField label="Last Name" id="LastName" placeholder="Last Name" />
        </div>

        <InputField label="D.O.B" id="DOB" type="date" />
        <InputField label="Email" id="Email" type="email" placeholder="Example: xyz@gmail.com" />
        <InputField label="Street" className='border border-gray-300 py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>

        <div className='flex gap-3'>
          <InputField label='City' className='border border-gray-300 py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
          <InputField label='State' className='border border-gray-300 py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
        </div>

        <div className='flex gap-3'>
          <InputField label='Zipcode' className='border border-gray-300 py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
          <InputField label='Country' className='border border-gray-300 py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
        </div>

        <div className='flex gap-3'>
          <InputField label="Contact No" id="ContactNo" type="tel" placeholder="Contact No" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-5 w-full justify-center">
          <ActionButton label="Edit" />
          <ActionButton label="Save" />
          <ActionButton label="Become a Seller" />
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, id, type = 'text', placeholder = '' }) => (
  <div className="w-full mt-4">
    <label htmlFor={id} className="block mb-2">{label}</label>
    <input
      type={type}
      id={id}
      className="w-full px-5 py-2 border border-gray-800"
      placeholder={placeholder}
      required
    />
  </div>
);

const ActionButton = ({ label }) => (
  <button className="bg-black text-white font-light px-8 py-2 mt-4">{label}</button>
);

export default MyProfile;
