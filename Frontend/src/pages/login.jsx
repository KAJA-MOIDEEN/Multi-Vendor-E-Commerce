import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

const Login =() => {

  const [currentState, setCurrentState]= useState('Sign Up');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const onSubmitHandler = async (event) =>{
      event.preventDefault();
      const data = {
        name: nameRef.current ? nameRef.current.value : "",
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }
      console.log("backendurl",backendUrl);
      
      try {
        if(currentState === 'Sign Up'){
          const response = await axios.post(backendUrl + '/api/user/register', data)
          
          if(response.data.success){
            setToken(response.data.token)
            toast.success(response.data.message)
            localStorage.setItem('token', response.data.token)
          }
          else{
            toast.error(response.data.message)
          }
        }
        else{
          const response = await axios.post(backendUrl + '/api/user/login', {email:data.email,password:data.password});
          if(!response.data.success){
            return toast.error(response.data.message)
          }
          toast.success(response.data.message)
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }
 useEffect(()=>{
  const token = localStorage.getItem("token")
  if(token){
    setToken(token)
    }
 },[])

 useEffect(()=>{
  if(token){
    navigate('/')
  }
},[token])


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' :<input ref={nameRef} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input ref={emailRef} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input ref={passwordRef} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your Password</p>
        {
          currentState === 'Login'
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4' type='submit'>{currentState === 'Login' ? 'Sign In' : 'Sign Up' }</button>
    </form>
  )
}

export default Login