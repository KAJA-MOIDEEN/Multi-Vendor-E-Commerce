import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { backendUrl, currency } from '../App';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const VendorsView = () => {
  const [list,setList] = useState([])
  const location = useLocation(); 
  const {token} = useContext(AuthContext);
  const { item } = location.state || {}; 
  console.log (item)

  // Create refs for each input field 
  const nameRef = useRef(null); 
  const surnameRef = useRef(null); 
  const userIdRef = useRef(null); 
  const dobRef = useRef(null); 
  const emailRef = useRef(null); 
  const phoneRef = useRef(null); 
  const roleRef = useRef(null); 
  const companyRef = useRef(null); 
  const aadhaarRef = useRef(null); 
  const panRef = useRef(null); 
  const gstRef = useRef(null); 

  // Create separate refs for each address field
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipcodeRef = useRef(null);
  const countryRef = useRef(null);

  const getVendorProduct = async()=>{
    
    try {
      const response = await axios.get(backendUrl+`/api/vendor/vendor/${item.userId}`,{headers:{token}})
      console.log(response.data)
      setList(response.data.products);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  
    
}

const removeProduct = async (id) => {
  try {
    const response  = await axios.post(backendUrl + '/api/product/remove', {id} , {headers:{token}})

    if (response.data.success){
      toast.success(response.data.message)
      await getVendorProduct();
    } else{
      toast.error(response.data.message)
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
  }

}
  useEffect(()=>{
    console.log("hit")
    getVendorProduct()
  },[item])

  // Function to handle form submission or any other action 
  const handleSubmit = () => { 
    const formData = { 
      name: nameRef.current.value, 
      surname: surnameRef.current.value, 
      userId: userIdRef.current.value, 
      dob: dobRef.current.value, 
      email: emailRef.current.value, 
      phone: phoneRef.current.value, 
      role: roleRef.current.value, 
      company: companyRef.current.value, 
      aadhaar: aadhaarRef.current.value, 
      pan: panRef.current.value, 
      GST: gstRef.current.value, 
      address: {
        street: streetRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zipcode: zipcodeRef.current.value,
        country: countryRef.current.value
      }
    }; 


    console.log(formData); // You can send this data to an API or log it 
  }; 

  return ( 
    <div className='px-4 md:px-28'> 
      <div className='flex flex-col md:flex-row gap-3'> 
        <InputField label="Name" type="text" placeholder="Name" defaultValue={item?.name || ''} ref={nameRef} /> 
        <InputField label="Sur Name" type="text" placeholder="Sur Name" defaultValue={item?.surname || ''} ref={surnameRef} /> 
        <InputField label="User Id" type="text" placeholder="User Id" defaultValue={item?.userId || ''} ref={userIdRef} /> 
      </div>

      <div className='flex flex-col md:flex-row gap-3 mt-3'>
        <InputField label="D.O.B" type="date" defaultValue={item?.dob || ''} ref={dobRef} />
        <InputField label="Email" type="text" placeholder="Email" defaultValue={item?.email || ''} ref={emailRef} />
        <InputField label="Phone" type="number" placeholder="Phone" defaultValue={item?.phone || ''} ref={phoneRef} />
      </div>

      <div className='flex flex-col md:flex-row gap-3 mt-3'>
        <InputField label="Aadhaar" type="text" placeholder="Aadhaar" defaultValue={item?.aadhaar || ''} ref={aadhaarRef} />
        <InputField label="Pan" type="text" placeholder="Pan" defaultValue={item?.pan || ''} ref={panRef} />
        <InputField label="GST" type="text" placeholder="GST" defaultValue={item?.GST || ''} ref={gstRef} />
      </div>

      <div className='flex flex-col md:flex-row gap-3 mt-3'>
        <InputField label="Role" type="text" placeholder="Role" defaultValue={item?.role || ''} ref={roleRef} />
        <InputField label="Company" type="text" placeholder="Company" defaultValue={item?.company || ''} ref={companyRef} />
      </div>

      {/* Address Fields */}
      <div className='mt-4'>
  <p className='mb-2'>Address</p>
  <div className='flex flex-col md:flex-row gap-3'>
    <InputField 
      label="Street" 
      type="text" 
      placeholder="Street" 
      defaultValue={item?.address?.street || ''}  // Reference specific address properties
      ref={streetRef} 
    />
    <InputField 
      label="City" 
      type="text" 
      placeholder="City" 
      defaultValue={item?.address?.city || ''} 
      ref={cityRef} 
    />
    <InputField 
      label="State" 
      type="text" 
      placeholder="State" 
      defaultValue={item?.address?.state || ''} 
      ref={stateRef} 
    />
    <InputField 
      label="ZipCode" 
      type="number" 
      placeholder="Zipcode" 
      defaultValue={item?.address?.zipcode || ''} 
      ref={zipcodeRef} 
    />
    <InputField 
      label="Country" 
      type="text" 
      placeholder="Country" 
      defaultValue={item?.address?.country || ''} 
      ref={countryRef} 
    />
  </div>
</div>
      <button onClick={handleSubmit} className="mt-5 px-4 py-2 bg-blue-500 text-white">
        Submit
      </button>

      {/* Vendor Products List */}
      <p className='mb-2 mt-10'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[3fr_3fr_3fr_3fr_3fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Vendor Image</b>
          <b>Vendor Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
      </div>

       {/* ------ Product  List ------- */}
       {
        list.map((item,index) => (
          <div className='grid grid-cols-[ifr_3fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1  px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.sellerCompany}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>

        ))


      }

    </div>
  );
};

// InputField component using React.forwardRef to handle refs
const InputField = React.forwardRef(({ label, type = 'text', placeholder, defaultValue, disabled }, ref) => (
  <div className="w-full mt-4">
    <label className="block mb-2">{label}</label>
    <input
      type={type}
      ref={ref}
      defaultValue={defaultValue}
      className= {`w-full px-5 py-2 border border-gray-800 ${type==="number"  ? "no-arrows" : ""}`}
      placeholder={placeholder}
      disabled={disabled}
      required
    />
  </div>
)); 

export default VendorsView;
