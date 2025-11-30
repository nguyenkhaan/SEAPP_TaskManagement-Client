import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import HeroSection from './LandingComponents/HeroSection'
import FeatureSection from './LandingComponents/FeatureSection'
import StepsSection from './LandingComponents/StepsSection'
import Testimonials from './LandingComponents/Testimonials'
import CTASection from './LandingComponents/CTASection'
import LandingPageLayout from '../layouts/LandingPageLayout'
import testing from '../services/testing'
function Landing()
//Boc ngoai cung ben ngoai la LandingpageLayout. Phan tu ben trong day la landingPage. Trong landingpage thi chua nhieu section
//Kich thuoc cua layout la 1440px, landing page lay w-full = 1440px, moi section cugn lay w-full 1440px 
{
    useEffect(() => {
        // testing()   //Chay ham de test thu    //Chay test da thanh cong 
    } , [])
    const pageContent = (
        <div className='bg-[#f8f9fe]'>
            <HeroSection />
            <FeatureSection />
            <StepsSection />
            <Testimonials />
            <CTASection />
        </div>
    )
    return (
        <LandingPageLayout children={pageContent}>
        
        </LandingPageLayout>
    )
}
export default Landing