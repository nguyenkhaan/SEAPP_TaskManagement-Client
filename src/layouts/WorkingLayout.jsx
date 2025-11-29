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
            <div className='min-w-screen'>
                <WorkingSidebar />
                <div className='absolute overflow-x-hidden w-screen xl:min-h-screen xl:w-[984px] scrollbar-none md:px-3 2xl:left-110 max-2xl:flex max-2xl:items-start max-2xl:justify-center -mt-5 xl:top-0 xl:left-42'> 
                    {children}
                </div>
            </div>
        </div>
    )
}
export default WorkingLayout