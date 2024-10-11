import React from 'react'

const NewsLetterBox =() => {
  const onSubmitHandler = (event)=>{
    event.preverntDefault();
  }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now & Get 20% Off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed eligendi tempora suscipit reprehenderit. Labore dolore sint nisi nemo cupiditate, similique ducimus ab sit.
        </p>
        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email' required />
            <button type='Submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox