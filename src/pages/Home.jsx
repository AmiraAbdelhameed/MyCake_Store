import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import CategorySection from '../components/Home/CategorySection'
import SpecialOffer from '../components/Home/SpecialOffer'
import ReviewsSec from '../components/Home/ReviewsSec'
import ContactsSec from '../components/Home/ContactsSec'

const Home = () => {
    return (
        <>
            <HeroSection />
            <CategorySection />
            <SpecialOffer />
            <ReviewsSec />
            <ContactsSec/>
        </>
    )
}

export default Home
