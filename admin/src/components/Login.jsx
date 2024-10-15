import React, { useRef, useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  
  const initialValue = {
    name: '', 
    email: '', 
    password: '', 
  };
  
  const inputValue = useRef(initialValue);

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();  // Corrected typo here

      // Accessing the values directly from the input fields
      const name = inputValue.current.name?.value;
      const email = inputValue.current.email?.value;
      const password = inputValue.current.password?.value;

      console.log({ name, email, password });
      
      // Further logic to handle login/signup
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      
      {/* Conditionally render name field only for Sign Up */}
      {currentState === 'Login' ? null : (
        <input 
          ref={(el) => inputValue.current.name = el} 
          type="text" 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Name' 
          required 
        />
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
