import React from 'react'
import ReactDOM from 'react-dom'
//Code layout o trong day 
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Landing from '../pages/Landing'
function LandingPageLayout({
    children 
}) {
    return (
        <>
            <Navbar />
            <div className='w-[1440px] min-h-100 bg-yellow-500 mt-18'>   
                {children}
            </div>
            <Footer /> 
        </>
    )
}
export default LandingPageLayout