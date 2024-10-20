import { ShopContext } from "@/context/ShopContext";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = ()=>{
    const {navigate,token,setCartItems,backendUrl} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()
    
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    
    const VerifyPayment = async()=>{
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl+'api/order/verifyStripe',{success,orderId},{headers:{token}})
            if (response.data.success) {
                setCartItems([])
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        VerifyPayment()
    },[token])
    return(
        <div>Verify</div>
    )
}

export default Verify