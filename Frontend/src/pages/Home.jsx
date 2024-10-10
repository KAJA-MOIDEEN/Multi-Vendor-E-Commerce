import Hero from '@/components/Hero'
import LatestCollection from '@/components/LatestCollection'
import NewsLetterBox from '@/components/NewsLetterBox'
import OurPolicy from '@/components/OurPolicy'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestCollection/>
        <BestSeller/>
        <OurPolicy/>
        <NewsLetterBox/>
    </div>
  )
}

export default Home