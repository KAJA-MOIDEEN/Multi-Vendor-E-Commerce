import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

import avartar from "../assets/image.png"
import logo from"../assets/image copy.png";

const Login = () => {

  const initialValue = {
    username: "",
    email: "",
    password: "",
    file:"",
  };

  const [LoginData, setLoginData] = useState(initialValue);
  
  console.log(LoginData);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto p-6 ">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center p-8 bg-orange-400 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-4">Simplify management with our dashboard</h1>
          <p className="text-white text-center mb-6">Simplify your e-commerce management with our user-friendly admin dashboard.</p>
          <img className="w-2/5 rounded-lg" src={avartar} alt="nature image" />
        </div>

        {/* Right Section - Signup Form */}
        
        <div className="flex justify-center p-8 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="flex justify-center">
        <img className="w-2/5 rounded-lg " src={logo} alt="nature image"/>
        
        </div>
        <div className="flex ">
        <input value={LoginData.file} name="file" type="file" className="" onChange={(e)=>setLoginData({...LoginData,file: e.target.value[0]})} />
          </div>
            <div>
              <input
                value={LoginData.email}
                onChange={(e) => setLoginData({ ...LoginData, email: e.target.value })}
                placeholder="Enter Email"
                name="email"
                type="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <input
                value={LoginData.password}
                onChange={(e) => setLoginData({ ...LoginData, password: e.target.value })}
                placeholder="Enter Password"
                name="password"
                type="password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"/>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-amber-700 transition duration-300">
                Signup
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;