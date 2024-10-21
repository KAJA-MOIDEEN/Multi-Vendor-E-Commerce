import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setRole,setToken} = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const  role = localStorage.getItem("role");
    if (token) {
      setToken(token);
      setRole(role)
    }
  }, []);

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const data = {
        email,
        password,
      };
      const response = await axios.post(`${backendUrl}/api/user/admin-login`, data);
      if (response.data.success) {
        
        setToken(response.data.user.token);
        setRole(response.data.role)

        localStorage.setItem("token", response.data.user.token);
        localStorage.setItem("role", response.data.user.role);
        
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>Login</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        type="email" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' 
        required 
      />

      <input 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        type="password" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password' 
        required 
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your Password</p>
        <p className='cursor-pointer'>Create Vendor Account</p>
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        Sign In
      </button>
    </form>
  );
};

export default Login;
