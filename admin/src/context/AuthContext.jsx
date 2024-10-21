import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const  AuthProvider = ({children})=>{
    const [role, setRole] = useState("Vendor");
    const [token, setToken] = useState("");
    
    
    const value = {
        role, setRole,
        token, setToken
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