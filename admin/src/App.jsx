import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import VendorsProducts from "./pages/VendorsProducts";
import Login from "./components/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./context/AuthContext";


export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {
  const {token,role} = useContext(AuthContext)

  return (
    <div className="bg-gray-50 min-h-screen">
      {token == "" ? <Login /> :  <>
        <Navbar/>
        <hr />
        <div className="flex w-full">
          <Sidebar />
          <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
              {role === "Admin" ? <Route path="/vendor-list" element={<VendorsProducts />}/> : ""}
            </Routes>
          </div>
        </div>
      </>}
     <ToastContainer/>
    </div>
  );
};

export default App;
 