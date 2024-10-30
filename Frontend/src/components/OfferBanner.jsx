import { assets } from '@/assets/frontend_assets/assets'; 
import React from 'react'; 
 
const OfferBanner = () => {  
  return (  
    <div className='flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-4 lg:gap-8 text-center py-10 sm:py-14 md:py-16 lg:py-20 bg-secondary-300 text-gray-700'>  
      <img className='w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/4 h-auto' src={assets.banner_girl} alt="Banner Girl" />  
      <img className='w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/4 h-auto' src={assets.banner_text} alt="Banner Text" />  
      <img className='w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/4 h-auto' src={assets.banner_boy} alt="Banner Boy" />  
    </div>  
  );  
}  
 
export default OfferBanner; 
