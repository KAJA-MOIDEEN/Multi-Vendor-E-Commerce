import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

const List = () => {
  const {token, role} = useContext(AuthContext);
  console.log("Role",role);
  
  const [list,setList] = useState([])
  const fetchList = async () => {
    try {

      if(role === "Vendor"){
        const response = await axios.get(backendUrl + '/api/vendor/vensorProduct',{headers:{token}})

        if(response.data.success){
          setList(response.data.products);
        }
        else{
          toast.error(response.data.message)
        }
      }else{
        const response = await axios.get(backendUrl + '/api/product/list',{headers:{token}})

        if(response.data.success){
          setList(response.data.products);
        }
        else{
          toast.error(response.data.message)
        }
      }


      

      
    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
    
  }
  const removeProduct = async (id) => {
    try {
      const response  = await axios.post(backendUrl + '/api/product/remove', {id} , {headers:{token}})

      if (response.data.success){
        toast.success(response.data.message)
        await fetchList();
      } else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }
  useEffect(()=>{
    fetchList()

  },[])



  return (
    <>
    <p className='mb-2'>All Products List</p>
    <div className='flex flex-col gap-2 '>
      {/* ------List Table Title------- */}
      <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>seller</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
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
            <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg hover:text-red-600'>X</p>
          </div>

        ))


      }

    </div>

    </>
  )
}

export default List