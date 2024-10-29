import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const  AuthProvider = ({children})=>{
    const [role, setRole] = useState("Vendor");
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const currency = "₹ ";
    
    const value = {
        role, setRole,
        token, setToken,
        navigate, currency
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