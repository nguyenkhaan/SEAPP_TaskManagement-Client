import React from 'react'
import ReactDOM from 'react-dom'
import Logo from './Logo'
import FooterList from './FooterList'
import DarkMode from './DarkMode/DarkMode'
export default function Footer() {
    return (
        <footer className='w-[1440px] relative px-16 h-120  pt-18'>
            <div className='grid grid-cols-12 border-b border-[#989898]'>
                <div className='col-span-6 flex items-start flex-col justify-start'>
                    <Logo width={220} height={58} />
                    <p className='w-[440px] text-xl h-[168px] text-(--color-text-desc)'>The ultimate task management solution for modern teams.</p>
                </div>
                <div className='col-span-2'>
                    <FooterList />
                </div>
                <div className='col-span-2'>
                    <FooterList />
                </div>
                <div className='col-span-2 flex flex-col gap-3 items-start'>
                    <span className='text-black text-2xl mb-1 font-medium'>Change theme</span>
                    <DarkMode />
                </div>
            </div>

            <div className='w-full flex relative pt-10 items-center justify-between'>
                <span className='block text-xl text-black'>© 2025 NoTask. All rights reserved.</span>
                <div className='flex items-center justify-between text-(--color-text-desc) gap-6'>
                    <span className='text-xl'>Privacy Policy</span>
                    <span className='text-xl'>Terms of Services</span>
                    <span className='text-xl'>Cookies Policy</span>
                </div>
                
            </div>
        </footer>
    )
}