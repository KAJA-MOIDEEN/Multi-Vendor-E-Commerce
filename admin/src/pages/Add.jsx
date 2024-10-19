import React, { useState, useRef } from 'react';
import { assets } from '../assets/admin_assets/assets.js';
import { backendUrl } from '../App.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [sizes, setSizes] = useState([]);

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);
  const bestsellerRef = useRef(null);

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Add text inputs
      formData.append('name', nameRef.current.value);
      formData.append('description', descriptionRef.current.value);
      formData.append('price', priceRef.current.value);
      formData.append('category', categoryRef.current.value);
      formData.append('subCategory', subCategoryRef.current.value);
      formData.append('bestseller', bestsellerRef.current.checked);
      formData.append('sizes', JSON.stringify(sizes));

      // Add file inputs
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      // Send data
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (!response.data.success) {
        toast.error('Product not added');
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSizeSelection = (size) => {
    if (sizes.includes(size)) {
      // Remove size if already selected
      setSizes(sizes.filter((s) => s !== size));
    } else {
      // Add size to the list
      setSizes([...sizes, size]);
    }
  };

  return (
    <form onSubmit={onSubmitHandle} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className='w-24 bg-center bg-cover' src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="Preview" />
            <input onChange={(e) => setImage1(e.target.files[0])} type='file' id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-24 bg-center bg-cover' src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="Preview" />
            <input onChange={(e) => setImage2(e.target.files[0])} type='file' id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-24 bg-center bg-cover' src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="Preview" />
            <input onChange={(e) => setImage3(e.target.files[0])} type='file' id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-24 bg-center bg-cover' src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="Preview" />
            <input onChange={(e) => setImage4(e.target.files[0])} type='file' id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input ref={nameRef} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea ref={descriptionRef} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap'>
        <div>
          <p className='mb-2'>Product category</p>
          <select ref={categoryRef} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select ref={subCategoryRef} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input ref={priceRef} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' required />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} onClick={() => handleSizeSelection(size)}>
              <p className={`${sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input ref={bestsellerRef} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  );
};

export default Add;
