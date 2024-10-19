import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // Login, Sign Up, or Forgot Password
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Handle login/signup form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current ? nameRef.current.value : '',
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', data);
        if (response.data.success) {
          setToken(response.data.token);
          toast.success(response.data.message);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === 'Login') {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email: data.email,
          password: data.password,
        });
        if (!response.data.success) {
          return toast.error(response.data.message);
        }
        toast.success(response.data.message);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Handle forgot password form submission
  const onForgotPasswordHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;

    try {
      const response = await axios.post(backendUrl + '/api/user/forgot-password', { email });
      if (response.data.success) {
        toast.success('Password reset email sent successfully.');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={currentState === 'Forgot Password' ? onForgotPasswordHandler : onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Conditionally render form fields based on the currentState */}
      {currentState === 'Sign Up' && (
        <input
          ref={nameRef}
          type='text'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      <input
        ref={emailRef}
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />

      {/* Password field only for Login or Sign Up, not Forgot Password */}
      {currentState !== 'Forgot Password' && (
        
        <input
          ref={passwordRef}
          type='password'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Password'
          required
        />
      )}

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {currentState !== 'Forgot Password' && (
          <p onClick={() => setCurrentState('Forgot Password')} className='cursor-pointer'>
            Forgot Your Password?
          </p>
        )}

        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>
            Create Account
          </p>
        ) : currentState === 'Sign Up' ? (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
            Login Here
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
            Back to Login
          </p>
        )}
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4' type='submit'>
        {currentState === 'Login'
          ? 'Sign In'
          : currentState === 'Sign Up'
          ? 'Sign Up'
          : 'Reset Password'}
      </button>
    </form>
  );
};

export default Login;
