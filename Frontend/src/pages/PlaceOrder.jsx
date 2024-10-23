import { assets } from '../assets/frontend_assets/assets.js'
import CartTotal from '@/components/CartTotal'
import Title from '@/components/Title'
import { ShopContext } from '@/context/ShopContext'
import axios from 'axios'
import React, { useContext, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { handler } from 'tailwindcss-animate'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  // Use refs for form data instead of useState
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipcodeRef = useRef(null);
  const countryRef = useRef(null);
  const phoneRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItem = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItem.push(itemInfo);              
            }
          }
        }
      }
      
      let orderData = {
        address: {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          street: streetRef.current.value,
          city: cityRef.current.value,
          state: stateRef.current.value,
          zipcode: zipcodeRef.current.value,
          country: countryRef.current.value,
          phone: phoneRef.current.value,
        },
        items: orderItem,
        amount: getCartAmount() + delivery_fee
      }

      const initPay = (order)=>{
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Order Payment",
          description: "Order Payment",
          order_id: order.id,
          recipt: order.recipt,
          handler: async(response)=>{
            console.log(response);

            try {

              const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {headers: {token}})
              if(data.success){
                navigate('/orders')
                setCartItems({})
              }
              
            } catch (error) {
              console.log(error);
              toast.error(error)
              
            }
            
          }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      }
      

      switch (method) {
        // Api call for cod Method
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          console.log(response.data); 
          if (response.data.success) {
            toast.success(response.data.message)
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: {token}});
          console.log(responseStripe.data);
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }
          else{
            toast.error(responseStripe.message) 
          }
          break;
        case 'razorpay':
          
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers: {token}})
          if(responseRazorpay.data.success){
            initPay(responseRazorpay.data.order);
            
          }
          break;

        default:
          console.log("default");
          
          break;
      }

    } catch (error) {
      // Handle the error
      toast.error("Something went wrong with the order submission.");
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
      {/* ----------leftside---------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required ref={firstNameRef} className='border border-gray-300 py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input required ref={lastNameRef} className='border border-gray-300 py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>

        <input required ref={emailRef} className='border border-gray-300 py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <input required ref={streetRef} className='border border-gray-300 py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

        <div className='flex gap-3'>
          <input required ref={cityRef} className='border border-gray-300 py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required ref={stateRef} className='border border-gray-300 py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required ref={zipcodeRef} className='border border-gray-300 py-1.5 px-3.5 w-full no-arrows' type="number" placeholder='Zipcode' />
          <input required ref={countryRef} className='border border-gray-300 py-1.5 px-3.5 w-full ' type="text" placeholder='Country' />
        </div>

        <div className='flex gap-3'>
          <input required ref={phoneRef} className='border border-gray-300 py-1.5 px-3.5 w-full no-arrows' type="number" placeholder='Phone' />
        </div>
      </div>

      {/* -----right side----- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'Payment'} text2={'METHOD'} />

          {/* ------Payment Method Selection------ */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
