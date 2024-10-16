import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Login = ({setToken}) => {

  const [currentState, setCurrentState] = useState('Login');

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
     setToken(token)
     }
 },[]);

  const initialValue = {
    name: '', 
    email: '', 
    password: '', 
    phone: '',
    address: '',
    companyName: '',
    aadhaar: '',
    pan: '',
    GST:""
  };
  
  const inputValue = useRef(initialValue);

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();  // Corrected typo here

      // Accessing the values directly from the input fields
      const name = inputValue.current.name?.value;
      const email = inputValue.current.email?.value;
      const password = inputValue.current.password?.value;
      const phone = inputValue.current.phone?.value;
      const address = inputValue.current.address?.value;
      const company = inputValue.current.companyName?.value;
      const aadhaar = inputValue.current.aadhaar?.value;
      const pan = inputValue.current.pan?.value;
      const GST = inputValue.current.GST?.value;

      if (currentState === 'Sign Up') {
        const data = {
          name, email, password, phone, address, company, aadhaar, pan, GST
        };
        const response = await axios.post(`${backendUrl}/api/user/admin-signup`, data);
        if (response.data.success) {
          toast.success(response.data.message);
          setCurrentState('Login');
        }
        if(!response.data.success){
          toast.error(response.data.message);
        }
      } else {
        const data = {
          email:email,
          password:password
        }
        const  response = await axios.post(`${backendUrl}/api/user/admin-login`,data);
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        }else{
          toast.error(response.data.message);
        }

      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      
      {/* Conditionally render fields for Sign Up */}
      {currentState === 'Sign Up' && (
        <>
          <input 
            ref={(el) => inputValue.current.name = el} 
            type="text" 
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='Name' 
            required 
          />
          <input 
            ref={(el) => inputValue.current.phone = el} 
            type="text" 
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='Phone' 
            required 
          />
          <input 
            ref={(el) => inputValue.current.address = el} 
            type="text" 
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='Address' 
            required 
          />
          <input 
            ref={(el) => inputValue.current.companyName = el} 
            type="text" 
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='Company Name' 
            required 
          />
          <input 
            ref={(el) => inputValue.current.aadhaar = el} 
            type="text" 
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='Aadhaar Number' 
            required 
          />
          <input 
            ref={(el) => inputValue.current.pan = el} 
            type="text" 
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='PAN Number' 
            required 
          />
          <input 
            ref={(el) => inputValue.current.GST = el} 
            type="text" 
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='GST' 
            required 
          />
        </>
      )}
      
      <input 
        ref={(el) => inputValue.current.email = el} 
        type="email" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' 
        required 
      />
      
      <input 
        ref={(el) => inputValue.current.password = el} 
        type="password" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password' 
        required 
      />
      
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your Password</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>
            Create Vendor Account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
            Login Here
          </p>
        )}
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
