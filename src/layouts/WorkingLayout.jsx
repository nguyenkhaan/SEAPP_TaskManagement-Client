import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import WorkingNavbar from '../components/WorkingNavbar'
import WorkingSidebar from '../components/WorkingSidebar'
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
    return (
        <div className='w-screen relative pb-10'>
            <WorkingNavbar />
            <div className='w-[1440px] left-0'>
                <WorkingSidebar />
                <div className='absolute overflow-x-hidden w-screen min-h-screen md:w-[984px] scrollbar-none md:left-110 -mt-5'>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default WorkingLayout