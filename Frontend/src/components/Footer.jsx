import { assets } from '@/assets/frontend_assets/assets'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-grey-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde placeat cumque vero veniam molestiae itaque ipsum praesentium nam in eos voluptatibus natus at, architecto mollitia quod, tempore, explicabo aut numquam?
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-grey-600'>
                    <li className='cursor-pointer' onClick={()=>navigate('/')} >Home</li>
                    <li className='cursor-pointer' onClick={()=>navigate('/about')}>About Us</li>
                    <li className='cursor-pointer'>Delivery</li>
                    <li className='cursor-pointer'>Privacy policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-grey-600'>
                    <li>+91 9876543210</li>
                    <li>contact@vendor.com</li>
                </ul>
            </div>
        </div>


        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ vendor.com - All rights reserved.</p>
        </div>


    </div>
  )
}

export default Footer