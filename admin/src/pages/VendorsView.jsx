// import React, { useRef } from 'react'
// import { useLocation } from 'react-router-dom';

// const VendorsView =() => {
//   const location = useLocation();
//   const {item} = location.state ||  {};
//   const name = useRef(item.name);
//   const GST = useRef(null);
//   const aadhaar = useRef(null);
//   const company = useRef(null);
//   const  address = useRef(null);
//   const dob =  useRef(null);
//   const  email = useRef(null);
//   const  phone = useRef(null);
//   const pan =  useRef(null);
//   const role = useRef(null);
//   const status =  useRef(null);
//   const surname  = useRef(null);
//   const userId =  useRef(null);
//   const _id =  useRef(null);

  
//   console.log(name.current);
  

  
  

//   return (
//     <div className='px-4 md:px-28'>
//       <div className='flex flex-col md:flex-row gap-3'>
//         <InputField label="Name" type="text" placeholder="Name" ref ={name.current} />
//         <InputField label="Sur Name" type="text" placeholder="Sur Name"/>
//         <InputField label="User Id" type="text" placeholder="User Id"/>
//       </div>
  
//       <div className='flex flex-col md:flex-row gap-3 mt-3'>
//         <InputField label="D.O.B" type="date"/>
//         <InputField label="Email" type="text" placeholder="Email"/>
//       </div>
  
//       <div className='flex flex-col md:flex-row gap-3 mt-3'>
//         <InputField label="Address" type="text" placeholder="Address"/>
//         <InputField label="Phone" type="number" placeholder="Phone"/>
//       </div>

//       <div className='flex flex-col md:flex-row gap-3 mt-3'>
//         <InputField label="Role" type="text" placeholder="Role"/>
//         <InputField label="Company" type="text" placeholder="Company"/>
//       </div>

//       <div className='flex flex-col md:flex-row gap-3 mt-3'>
//         <InputField label="Aadhaar" type="number" placeholder="Aadhaar"/>
//         <InputField label="Pan" type="text" placeholder="Pan"/>
//         <InputField label="GST" type="text" placeholder="GST"/>
//       </div>

//       <p className='mb-2 mt-10'>All Products List</p>
//         <div className='flex flex-col gap-2'>
//           {/* ------List Table Title------- */}
//             <div className='hidden md:grid grid-cols-[3fr_3fr_3fr_3fr_3fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
//               <b>Vendor Image</b>
//               <b>Vendor Name</b>
//               <b>Category</b>
//               <b>Price</b>
//               <b className='text-center'>Action</b>
//             </div>
//         </div>
//     </div>
//   )
// }  
// const InputField = React.forwardRef(({ label, type = 'text', placeholder, disabled }, ref) => (
//   <div className="w-full mt-4">
//     <label className="block mb-2">{label}</label>
//     <input
//       type={type}
//       ref={ref}
//       className="w-full px-5 py-2 border border-gray-800"
//       placeholder={placeholder}
//       required
//       disabled={disabled}
//     />
//   </div>
// ));


// export default VendorsView 

import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';

const VendorsView = () => {
  const location = useLocation();
  const { item } = location.state || {};

  // Create refs for each input field
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const userIdRef = useRef(null);
  const dobRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const phoneRef = useRef(null);
  const roleRef = useRef(null);
  const companyRef = useRef(null);
  const aadhaarRef = useRef(null);
  const panRef = useRef(null);
  const gstRef = useRef(null);

  // Function to handle form submission or any other action
  const handleSubmit = () => {
    const formData = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      userId: userIdRef.current.value,
      dob: dobRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      phone: phoneRef.current.value,
      role: roleRef.current.value,
      company: companyRef.current.value,
      aadhaar: aadhaarRef.current.value,
      pan: panRef.current.value,
      gst: gstRef.current.value,
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
      </div>
  
      <div className='flex flex-col md:flex-row gap-3 mt-3'>
        <InputField label="Address" type="text" placeholder="Address" defaultValue={item?.address || ''} ref={addressRef} />
        <InputField label="Phone" type="number" placeholder="Phone" defaultValue={item?.phone || ''} ref={phoneRef} />
      </div>

      <div className='flex flex-col md:flex-row gap-3 mt-3'>
        <InputField label="Role" type="text" placeholder="Role" defaultValue={item?.role || ''} ref={roleRef} />
        <InputField label="Company" type="text" placeholder="Company" defaultValue={item?.company || ''} ref={companyRef} />
      </div>

      <div className='flex flex-col md:flex-row gap-3 mt-3'>
        <InputField label="Aadhaar" type="number" placeholder="Aadhaar" defaultValue={item?.aadhaar || ''} ref={aadhaarRef} />
        <InputField label="Pan" type="text" placeholder="Pan" defaultValue={item?.pan || ''} ref={panRef} />
        <InputField label="GST" type="text" placeholder="GST" defaultValue={item?.GST || ''} ref={gstRef} />
      </div>

      <button onClick={handleSubmit} className="mt-5 px-4 py-2 bg-blue-500 text-white">
        Submit
      </button>

      <p className='mb-2 mt-10'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* ------List Table Title------- */}
        <div className='hidden md:grid grid-cols-[3fr_3fr_3fr_3fr_3fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Vendor Image</b>
          <b>Vendor Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
      </div>
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
      className="w-full px-5 py-2 border border-gray-800"
      placeholder={placeholder}
      disabled={disabled}
      required
    />
  </div>
));

export default VendorsView;
