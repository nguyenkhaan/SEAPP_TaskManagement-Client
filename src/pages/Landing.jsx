import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect , useState } from 'react'
import HeroSection from './LandingComponents/HeroSection'
import FeatureSection from './LandingComponents/FeatureSection'
import StepsSection from './LandingComponents/StepsSection'
import Testimonials from './LandingComponents/Testimonials'
import CTASection from './LandingComponents/CTASection'
import LandingPageLayout from '../layouts/LandingPageLayout'
import testing from '../services/testing'
import Loading from './Loading'
function Landing()
//Boc ngoai cung ben ngoai la LandingpageLayout. Phan tu ben trong day la landingPage. Trong landingpage thi chua nhieu section
//Kich thuoc cua layout la 1440px, landing page lay w-full = 1440px, moi section cugn lay w-full 1440px 
{
    useEffect(() => {
        testing()   //Chay ham de test thu    //Chay test da thanh cong 
        alert('Máy chủ miễn phí nên đôi khi sẽ “ngủ” nếu không hoạt động trong vài phút. Mong mọi người thông cảm.\n\nNếu điện thoại đang ở chế độ tối, hãy chuyển sang chế độ sáng để trải nghiệm đầy đủ giao diện dark theme của web. Thankyou mn lots of love ^^');


    } , [])
    const pageContent = (
        <div className='bg-(--color-background-1) w-full overflow-x-hidden'>
            <HeroSection />
            <FeatureSection />
            <StepsSection />
            <Testimonials />
            <CTASection />
        </div>
    )
    const currentPage = (
        <LandingPageLayout children={pageContent}></LandingPageLayout>
    )
    return (
        currentPage
    )
}
export default Landing