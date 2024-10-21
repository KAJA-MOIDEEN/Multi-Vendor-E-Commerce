
import { assets } from '@/assets/frontend_assets/assets'
import NewsLetterBox from '@/components/NewsLetterBox'
import Title from '@/components/Title'
import React from 'react'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>At [Your Store Name], we are more than just a clothing store; we are a community of fashion lovers dedicated to celebrating individuality. Our journey began with a simple idea: to offer a carefully curated collection that embodies the latest trends while maintaining timeless appeal. Every piece in our store tells a story, and we invite you to create your own with our unique styles.</p>
            <p>Our journey began with a vision to create a space where fashion meets affordability. We handpick each item in our collection, ensuring that you’ll find everything from casual everyday wear to statement pieces that will turn heads. We pride ourselves on offering diverse styles that cater to everyone, regardless of age, shape, or personal taste.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Our mission is simple: to empower individuals to express their unique style through quality clothing. We are dedicated to providing exceptional customer service and a seamless shopping experience, whether you’re browsing in-store or online.</p>
        </div>
        </div>
        <div className='text-xl py-4'>
            <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>
        <div className='flex flex-col md:flex-row text-sm -scroll-mb-20'>
          
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Quality Assurance:</b>
              <p className='text-gray-600'>we prioritize quality in every garment we offer. Each piece undergoes rigorous inspection and is crafted from carefully sourced materials to ensure durability and comfort. </p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Convenience:</b>
              <p className='text-gray-600'>we strive to make your shopping experience seamless and enjoyable. With easy online ordering, fast shipping, and hassle-free returns, finding your perfect outfit has never been easier. Shop anytime, anywhere, and enjoy fashion at your fingertips!</p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Exceptional Customer:</b>
              <p className='text-gray-600'>Exceptional customer service is at the heart of everything we do. Our friendly and knowledgeable team is always ready to assist you, ensuring a personalized shopping experience. Your satisfaction is our priority, and we’re here to make your fashion journey delightful!</p>
          </div>
        </div>
      <NewsLetterBox/>
    </div>
  )
}
export default About