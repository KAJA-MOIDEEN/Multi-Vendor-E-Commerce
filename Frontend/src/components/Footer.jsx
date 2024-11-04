import { assets } from '@/assets/frontend_assets/assets'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full bg-secondary-100 text-sm'>
            <div className='flex flex-col sm:grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-8 md:gap-14 px-5 md:px-20 py-10 mt-10'>
                <div>
                    <img src={assets.logo} alt="Logo" className='w-32 md:w-48' />
                    <p className='w-full md:w-2/3 text-grey-600 mt-4'>
                        Discover the ultimate blend of comfort and style in our latest collection. Elevate your wardrobe with trendy, must-have pieces. Explore our newest arrivals for the perfect statement!
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-4'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-grey-600'>
                        <li className='cursor-pointer' onClick={() => navigate('/')}>Home</li>
                        <li className='cursor-pointer' onClick={() => navigate('/about')}>About Us</li>
                        <li className='cursor-pointer'>Delivery</li>
                        <li className='cursor-pointer'>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-4'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-grey-600'>
                        <li><a href='tel:+91 9876543210'>+91 9876543210</a></li>
                        <li><a href="mailto:contact@vendor.com">contact@vendor.com</a></li>
                    </ul>
                </div>
            </div>
            
            <div className='bg-secondary-200 text-white'>
                <hr className='border-t border-grey-300' />
                <p className='py-4 text-center'>Copyright 2024 © vendor.com - All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
