import { ShopContext } from '@/context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './Productitem'

const BestSeller = () => {
    const {products} = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])
    
    useEffect(()=>{
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
    },[products])
    
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={"BEST"} text2={"SELLER"}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600'>
            Unleash your inner fashionista with our newest drop of stylish essentials.Stand out with bold prints and timeless cuts, perfect for every occasion. From casual to elegant, find your perfect fit here!</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item, index) =>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} sellerCompany={item.sellerCompany}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller