import React from 'react'

const VendorsView =() => {
  return (
    <div className='px-4 md:px-28'>
      <div className='flex flex-col md:flex-row gap-3'>
        <InputField label="Name" type="text" placeholder="Name"/>
        <InputField label="Sur Name" type="text" placeholder="Sur Name"/>
        <InputField label="User Id" type="text" placeholder="User Id"/>
      </div>
  
      <div className='flex flex-col md:flex-row gap-3 mt-3'>
        <InputField label="D.O.B" type="date"/>
        <InputField label="Email" type="text" placeholder="Email"/>
      </div>
  
      <div className='flex flex-col md:flex-row gap-3 mt-3'>
        <InputField label="Address" type="text" placeholder="Address"/>
        <InputField label="Phone" type="number" placeholder="Phone"/>
      </div>

      <div className='flex flex-col md:flex-row gap-3 mt-3'>
        <InputField label="Role" type="text" placeholder="Role"/>
        <InputField label="Company" type="text" placeholder="Company"/>
      </div>

      <div className='flex flex-col md:flex-row gap-3 mt-3'>
        <InputField label="Aadhaar" type="number" placeholder="Aadhaar"/>
        <InputField label="Pan" type="text" placeholder="Pan"/>
        <InputField label="GST" type="text" placeholder="GST"/>
      </div>

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
  )
}  
const InputField = React.forwardRef(({ label, type = 'text', placeholder, disabled }, ref) => (
  <div className="w-full mt-4">
    <label className="block mb-2">{label}</label>
    <input
      type={type}
      ref={ref}
      className="w-full px-5 py-2 border border-gray-800"
      placeholder={placeholder}
      required
      disabled={disabled}
    />
  </div>
));


export default VendorsView