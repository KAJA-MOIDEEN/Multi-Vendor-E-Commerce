import { ShopContext } from '../context/ShopContext'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image,name,price, sellerCompany})=> {
    const {currency} = useContext(ShopContext)

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`} data-aos="fade-up"
     data-aos-duration="850">
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out w-52 h-60' src={image[0]} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='pt-3 pb-1 text-sm'>Sold By: {sellerCompany}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem