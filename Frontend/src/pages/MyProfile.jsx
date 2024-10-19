import React, { useContext, useEffect, useRef, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets.js';
import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const MyProfile = () => {
  const inputRef = useRef(null);  
  const { token, backendUrl, userProfile} = useContext(ShopContext);
  const [profileImage, setProfileImage] = useState(null); // Manage profile image
  const [isEditing, setIsEditing] = useState(false); // Control edit mode

  // Creating refs for form fields
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const dobRef = useRef(null);
  const emailRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipcodeRef = useRef(null);
  const countryRef = useRef(null);
  const phoneRef = useRef(null);

  const handleImageClick = () => {
    if (isEditing) inputRef.current.click(); // Only allow image upload in edit mode
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file); // Set the image as file object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true); // Switch to edit mode
      return;
    }

    try {
      const formToSubmit = new FormData();
      formToSubmit.append('name', firstNameRef.current.value);
      formToSubmit.append('surname', lastNameRef.current.value);
      formToSubmit.append('dob', dobRef.current.value);
      formToSubmit.append('email', emailRef.current.value);
      formToSubmit.append('address[street]', streetRef.current.value);
      formToSubmit.append('address[city]', cityRef.current.value);
      formToSubmit.append('address[state]', stateRef.current.value);
      formToSubmit.append('address[zipcode]', zipcodeRef.current.value);
      formToSubmit.append('address[country]', countryRef.current.value);
      formToSubmit.append('phone', phoneRef.current.value);

      if (profileImage && typeof profileImage !== 'string') {
        formToSubmit.append('profileImage', profileImage);
      }

      const response = await axios.put(`${backendUrl}/api/user/user-update`, formToSubmit, { headers: { token } });

      console.log('Profile updated successfully:', response.data);
      toast.success(response.data.message);

      setIsEditing(false); // Switch back to view-only mode after saving
    } catch (error) {
      toast.error(error.message);
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  };

  // Fetch and populate the form fields including the profile image
  const fetchProfileData = async () => {
    try {
      if (firstNameRef.current) firstNameRef.current.value = userProfile.fname;
      if (lastNameRef.current) lastNameRef.current.value = userProfile.surname;
      if (dobRef.current) dobRef.current.value = userProfile.dob;
      if (emailRef.current) emailRef.current.value = userProfile.email;
      if (streetRef.current) streetRef.current.value = userProfile.address.street;
      if (cityRef.current) cityRef.current.value = userProfile.address.city;
      if (stateRef.current) stateRef.current.value = userProfile.address.state;
      if (zipcodeRef.current) zipcodeRef.current.value = userProfile.address.zipcode;
      if (countryRef.current) countryRef.current.value = userProfile.address.country;
      if (phoneRef.current) phoneRef.current.value = userProfile.phone;

      // Set profile image URL if it exists
      if (userProfile.image) {
        setProfileImage(userProfile.image); // Populate profile image URL
      }
    } catch (error) {
      console.log(error.message);
    }
  };
    

  useEffect(() => {
    fetchProfileData();
  }, [userProfile]);

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <form onSubmit={handleSubmit} className="flex flex-col w-full sm:max-w-[480px] gap-4 mb-5">
        <div className="text-2xl">
          <Title text1="My" text2="Profile" />
        </div>

        {/* Profile Image Upload */}
        <div onClick={handleImageClick} className={`cursor-pointer flex justify-center ${isEditing ? '' : 'cursor-not-allowed'}`}>
          {profileImage ? (
            typeof profileImage === 'string' ? (
              // If profileImage is a URL (existing image)
              <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-5" />
            ) : (
              // If profileImage is a file (newly uploaded)
              <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-5" />
            )
          ) : (
            // Default profile icon
            <img src={assets.profile_icon} alt="Profile Icon" className="w-32 h-32 rounded-full object-contain" />
          )}
          <input className="hidden" type="file" onChange={handleImageChange} ref={inputRef} />
        </div>

        {/* Profile Form */}
        <div className="flex flex-col sm:flex-row sm:space-x-5 w-full">
          <InputField  label="First Name" ref={firstNameRef} placeholder="First Name" disabled={!isEditing} />
          <InputField  label="Last Name" ref={lastNameRef} placeholder="Last Name" disabled={!isEditing} />
        </div>

        <InputField  label="D.O.B" ref={dobRef} type="date" disabled={!isEditing} />
        <InputField  label="Email" ref={emailRef} type="email" placeholder="Example: xyz@gmail.com" disabled={!isEditing} />
        <InputField  label="Street" ref={streetRef} type="text" placeholder="Street" disabled={!isEditing} />

        <div className="flex gap-3">
          <InputField label="City" ref={cityRef} type="text" placeholder="City" disabled={!isEditing} />
          <InputField label="State" ref={stateRef} type="text" placeholder="State" disabled={!isEditing} />
        </div>

        <div className="flex gap-3">
          <InputField label="Zipcode" ref={zipcodeRef} type="number" placeholder="Zipcode" disabled={!isEditing} />
          <InputField label="Country" ref={countryRef} type="text" placeholder="Country" disabled={!isEditing} />
        </div>

        <InputField label="Contact No" ref={phoneRef} type="tel" placeholder="Contact No" disabled={!isEditing} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-5 w-full justify-center">
          <ActionButton label={isEditing ? "Save" : "Edit"} />
          <Seller role={userProfile.role} label = {userProfile.role === "user" ? "Become a Celler" : "Seller Dashboard"}/>
        </div>
      </form>
    </div>
  );
};

const InputField = React.forwardRef(({ label, type = 'text', placeholder, disabled }, ref) => (
  <div className="w-full mt-4">
    <label className="block mb-2">{label}</label>
    <input
      type={type}
      ref={ref}
      className="w-full px-5 py-2 border border-gray-800"
      placeholder={placeholder}
      required
      disabled={disabled}
    />
  </div>
));

const ActionButton = ({ label}) => (
  <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
    {label}
  </button>
);

const Seller = ({ label , role })=>{
  return (
    role === "user" ?(
    <Link to={"/seller-register"} className="bg-black text-white font-light px-8 py-2 mt-4">
    { label }
  </Link>) : 
  <Link to={"/adminlogin"} className="bg-black text-white font-light px-8 py-2 mt-4">
  { label }
</Link>
  )
}

export default MyProfile;
