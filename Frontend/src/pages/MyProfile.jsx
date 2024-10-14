import React from 'react'
import Title from '../components/Title'
import { useRef, useState} from 'react'
import { assets } from '../assets/frontend_assets/assets.js'

const UserProfile = () =>{
    const inputRef = useRef(null)
    const [Image, setImage] = useState ("")


    const handleImageClick = () =>{
        inputRef.current.click()
    }

    const handleImageChange = (event) =>{
        const file = event.target.files[0]
        console.log(file)
        setImage(event.target.files[0])
    }

  return (
    <div className='flex flex-col items-center w-[90%] sm:max-w-96 lg:max-w-2xl m-auto mt-14 gap-4 text-gray-800'>

        <div className='border-t pt-16 mb-5'>
            <div className='text-2xl'>
                <Title text1={'My'} text2={'Profile'} />
            </div>
        </div>

        {/* profile upload */}
        <div onClick={handleImageClick}>
            {Image ? <img src={URL.createObjectURL(Image)} alt="" className='w-32 h-32 rounded-full object-cover mb-5'/>:<img src={assets.profile_icon} alt="" className='w-32 h-32 rounded-full object-cover' />}
            <input className='hidden' type="file" onChange={handleImageChange} ref= {inputRef}/>
        </div>

        <div className='flex flex-col sm:flex-row sm:space-x-5 w-full'>

            <div className='flex-1'>
                <label className='flex items-center mb-2' htmlFor="First Name">First Name</label>
                <input
                    type="text"
                    className='w-full px-5 py-2 border border-gray-800'
                    placeholder='First Name'
                    required
                />
            </div>
            

            <div className='flex-1 mt-4 sm:mt-0'>
                <label className='flex items-center mb-2' htmlFor="Last Name">Last Name</label>
                <input
                    type="text"
                    className='w-full px-5 py-2 border border-gray-800'
                    placeholder='Last Name'
                    required
                />
        </div>
    </div>

    <div className='w-full mt-4'>
        <label htmlFor="D.O.B" className="block mb-2">D.O.B</label>
        <input
            type="date"
            className='w-full px-5 py-2 border border-gray-800'
            required
        />
    </div>

    <div className='w-full mt-4'>
        <label htmlFor="Email" className="block mb-2">Email</label>
        <input
            type="email"
            className='w-full px-5 py-2 border border-gray-800'
            placeholder='Example: xyz@gmail.com'
            required
        />
    </div>
    <div className='w-full mt-4'>
        <label htmlFor="ContactNo" className="block mb-2">ContactNo</label>
        <input
            type="tel"
            className='w-full px-5 py-2 border border-gray-800'
            placeholder='Contact No'
            required
        />
    </div>

    <div className='w-full mt-4'>
        <label htmlFor="Address" className="block mb-2">Address</label>
        <textarea
            type="text"
            rows='4'
            cols= '5'
            className='w-full px-5 py-2 border border-gray-800'
            placeholder='Address'
            required
        />
    </div>

    <div className='flex flex-col sm:flex-row sm:space-x-5 w-full justify-center'>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>Edit</button>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>Save</button>
    </div>
    
</div>

  )
}

export default UserProfile