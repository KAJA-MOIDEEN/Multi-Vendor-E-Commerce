import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backendUrl } from "../App";


export const AuthContext = createContext();

export const  AuthProvider = ({children})=>{
    const [role, setRole] = useState("Vendor");
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const currency = "₹ ";
    const [list, setList] = useState([]);

    console.log(list);
    
    // fetching all vendors list  
    const fetchList = async () => {
        try {
          const response = await axios.get(`${backendUrl}/api/user/vendor-details`, { headers: { token } });
          if (response.data.success) {
            setList(response.data.vendorDetails);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      };
    
    const value = {
        role, setRole,
        token, setToken,
        navigate, currency,
        fetchList,
        list, setList
    }

    useEffect(()=>{
        const  token = localStorage.getItem("token");
        const  role = localStorage.getItem("role");
        if(token){
            setToken(token);
            setRole(role)
            }
    },[token])
    

    return (
        <AuthContext.Provider value={value} >
        {children}
        </AuthContext.Provider>
    );
}