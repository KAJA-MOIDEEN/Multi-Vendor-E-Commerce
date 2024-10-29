import { createContext, useEffect, useState } from "react";
// import { products } from "@/assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹ ";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search,setSearch] = useState('');
  const [products, setProducts] = useState([])
  const [showSearch,setShowSearch ] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('')
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('');
  const [orders, setOrders] = useState([])
  const [userProfile, setUserProfile] = useState([])
  const [role,setRole]=useState('')


  const addToCart = async (itemId, size) => {
    if (!token) {
      toast.error("unauthorized login again")
      return
    }
    if(!size){
      toast.error("Selecet product size")
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
     
    }
    setCartItems(cartData);


    if (token) {
      try {
        const response = await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})
        if (response.data.success) {
          toast.success(response.data.message);  
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };


  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    
    if (token) {
      try {
      const response = await axios.post(backendUrl+"/api/cart/update",{itemId,size,quantity},{headers:{token}});
      if (response.data.success) {
        toast.success(response.data.success);
      }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
    
  };

  const getCartAmount = () => {
    let total = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
            if (cartItems[items][item] > 0) {
          total += cartItems[items][item] * itemInfo.price;
        }
        } catch (error) {}
      }
    }
    return total;
  };

  const getProductsData = async ()=>{
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if(response.data.success){
        setProducts(response.data.products)
        
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const getUserCart = async (token) => {
    try {
        if (token) {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                toast.error(response.data.message); // Handle API error
            }
        }
    } catch (error) {
        console.log(error);
        toast.error("Failed to load cart data.");
    }
};

const getUserProfile = async (token)=>{
  try {
    if(token){
      const response = await axios.get(`${backendUrl}/api/user/user-profile`,{headers:{token}})
      
      if(response.data.success){
        setUserProfile(response.data.user)
      }
     
      
    }
  } catch (error) {
    
  }
}


  useEffect(()=>{
    getProductsData();
  },[])

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      console.log(token,"contex")
      setToken(token)
      getUserCart(token)
      getUserProfile(token);
      }
   },[])

   useEffect(()=>{
console.log(token,"context")
   },[token])

  
  


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    profileImage, 
    setProfileImage,
    setCartItems,
    orders, setOrders,
    userProfile,
    setUserProfile,
    role,setRole
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
