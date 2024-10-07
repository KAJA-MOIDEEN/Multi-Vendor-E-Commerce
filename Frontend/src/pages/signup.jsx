import React, { useRef } from "react";
import signupimg from "../assets/image.png";
import logo from "../assets/image copy.png"

import { Link } from "react-router-dom";

const Register = () => {
//   const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const formData = new FormData();
    // formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-white">

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl mx-auto p-6 bg-slate-200 rounded-tl-[4rem] rounded-br-[4rem]">
        <div className="flex flex-col justify-normal p-8 bg-orange-400 rounded-tl-[4rem] shadow-lg">
          <span className="text-3xl font-bold text-white mb-4">
            Simplify
          </span>
          <span className="text-3xl font-bold text-white mb-4">
            management with
          </span>
          <h1 className="text-4xl font-bold text-white mb-4">
            Our dashboard
          </h1>
          <p className="text-white mt-6">
            Simplify your e-commerce management with our user-friendly admin dashboard.
          </p>
          <img className="w-2/5" src={signupimg} alt="Company Logo" />
        </div>

        <div className="flex justify-center p-8 bg-white rounded-br-[4rem] shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="flex justify-center">
              <img className="w-2/5 rounded-lg" src={logo} alt="Company Logo" />
            </div>
            
            {/* <div>
              <input
                ref={nameRef} 
                placeholder="Enter Your Name"
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"/>
            </div> */}

            <div>
              <input
                ref={emailRef}
                placeholder="Enter Email"
                type="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"/>
            </div>

            <div>
              <input
                ref={passwordRef}
                placeholder="Enter Password"
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
      </div>
      </div>
  );
};

export default Register;
