import { assets } from '@/assets/frontend_assets/assets';
import React from 'react';

const OfferBanner = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between sm:justify-center items-center gap-6 sm:gap-4 lg:gap-8 text-center py-10 sm:py-12 md:py-16 lg:py-20 bg-secondary-300 text-gray-700 w-full md:h-44'>
      {/* Image hidden on mobile, shown on sm screens and above */}
      <img className='hidden sm:block sm:h-44' src={assets.banner_girl} alt="Banner Girl" />
      
      {/* Image displayed on all screens, but width adjusted responsively */}
      {/* <img className='w-2/3 sm:w-5/12 md:w-2/4 lg:w-10/12 h-20 xl:w-9/12 md:h-32' src={assets.banner_text} alt="Banner Text" /> */}
      <span className='relative flex justify-center items-center w-2/3 sm:w-5/12 md:w-2/4 lg:w-10/12 h-20 md:h-32 xl:w-9/12'>
      <p className='absolute text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-200 z-20 font-outfit text-center whitespace-nowrap'>
        Join and Earn 5% Rewards on <br/>Subscription
      </p>
      <p className='absolute text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] text-black z-10 opacity-30 font-stick whitespace-nowrap'>
        URBAN CHIC
      </p>
      </span>



      {/* Image hidden on mobile, shown on sm screens and above */}
      <img className='hidden sm:block sm:h-44' src={assets.banner_boy} alt="Banner Boy" />
    </div>
  );
}

export default OfferBanner;
