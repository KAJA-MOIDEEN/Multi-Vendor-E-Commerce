
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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet enim minima atque ab ducimus nemo repellendus temporibus, voluptates provident similique officiis illo fuga consectetur. Cum in ipsa ut illum numquam.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem accusantium porro odit? Rerum eaque vitae error, explicabo quasi dolorem, perspiciatis vero, nisi ratione totam est cum consequuntur tempora sit labore.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A recusandae hic dicta obcaecati veniam dolore repellendus eius, iste suscipit iure voluptate atque voluptates architecto ducimus modi fugit. Porro, voluptate fugit.</p>
        </div>
        </div>
        <div className='text-xl py-4'>
            <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>
        <div className='flex flex-col md:flex-row text-sm -scroll-mb-20'>
          
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Quality Assurance:</b>
              <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus iure ea autem sed atque quasi voluptas ut, perspiciatis illum similique ullam. Ratione adipisci, architecto facere nam explicabo doloremque voluptatum.</p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Convenience:</b>
              <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus iure ea autem sed atque quasi voluptas ut, perspiciatis illum similique ullam. Ratione adipisci, architecto facere nam explicabo doloremque voluptatum.</p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Exceptional Customer:</b>
              <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus iure ea autem sed atque quasi voluptas ut, perspiciatis illum similique ullam. Ratione adipisci, architecto facere nam explicabo doloremque voluptatum.</p>
          </div>
        </div>
      <NewsLetterBox/>
    </div>
  )
}
export default About