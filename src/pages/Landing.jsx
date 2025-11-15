import React from 'react'
import ReactDOM from 'react-dom'
import Section1 from './LandingComponents/Section1'
import Section2 from './LandingComponents/Section2'
import Section3 from './LandingComponents/Section3'
import Section4 from './LandingComponents/Section4'
import Section5 from './LandingComponents/Section5'
import LandingPageLayout from '../layouts/LandingPageLayout'
function Landing()
//Boc ngoai cung ben ngoai la LandingpageLayout. Phan tu ben trong day la landingPage. Trong landingpage thi chua nhieu section
//Kich thuoc cua layout la 1440px, landing page lay w-full = 1440px, moi section cugn lay w-full 1440px 
{
    const pageContent = (
        <div className='bg-[#f8f9fe]'>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
        </div>
    )
    return (
        <LandingPageLayout children={pageContent}>
        
        </LandingPageLayout>
    )
}
export default Landing