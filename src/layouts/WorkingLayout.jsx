import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import WorkingNavbar from '../components/WorkingNavbar'
import WorkingSidebar from '../components/WorkingSidebar'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
function WorkingLayout({
    children = true
}) {
    // useEffect(() => {
    //     // khi component mount → khóa scroll
    //     document.body.style.overflow = 'hidden';

    //     // khi component unmount → mở lại scroll
    //     return () => {
    //         document.body.style.overflow = 'auto';
    //     };
    // }, []);
    const [showSidebar , setShowSidebar] = useState(false) 
    return (
        <div className='w-screen relative pb-10'>
            <WorkingNavbar />
            <div className='w-[1440px] left-0'>
                <WorkingSidebar />
                <div className='absolute overflow-x-hidden w-screen xl:min-h-screen xl:w-[984px] scrollbar-none md:px-3 xl:left-110 -mt-5'>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default WorkingLayout