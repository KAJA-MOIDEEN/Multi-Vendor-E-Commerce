import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {

  const [token, setToken] = useState("");

  useEffect(()=>{
    setToken(token)
    console.log(token);
  },[setToken]);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
     setToken(token)
     }
 },[]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? <Login setToken = {setToken} token={token}/> :  <>
        <Navbar setToken={setToken}/>
        <hr />
        <div className="flex w-full">
          <Sidebar />
          <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route path="/" element={<Add />} />
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List token={token}/>} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </>}
     <ToastContainer/>
    </div>
  );
};

export default App;
