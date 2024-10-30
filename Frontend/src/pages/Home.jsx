import Hero from '@/components/Hero'
import LatestCollection from '@/components/LatestCollection'
import NewsLetterBox from '@/components/NewsLetterBox'
import OurPolicy from '@/components/OurPolicy'
import BestSeller from '@/components/BestSeller'
import React from 'react'
import OfferBanner from '@/components/OfferBanner'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestCollection/>
        <BestSeller/>
        <OfferBanner />
        <OurPolicy/>
        <NewsLetterBox/>
    </div>
  )
}

export default Home