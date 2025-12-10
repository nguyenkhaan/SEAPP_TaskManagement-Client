import React from 'react'
import ReactDOM from 'react-dom'
import Logo from './Logo'
import FooterList from './FooterList'
import DarkMode from './DarkMode/DarkMode'
const aboutUs = [
    {
        name: 'Our Team', 
        url: '/'
    }, 
    {
        name: 'Product', 
        url: '' 
    }, 
    {
        name: 'Blog', 
        url: '' 
    }
]
const customerSupports = [
    {
        name: 'Help Center', 
        url: ''
    }, 
    {
        name: 'FAQs', 
        url: '' 
    }, 
    {
        name: 'Contact Us', 
        url: 'https://www.facebook.com/kha.an.907155'
    }, 
    {
        name: 'Report an Issue', 
        url: 'https://www.facebook.com/kha.an.907155' 
    }
]
export default function Footer() {
    return (
        <footer className='w-screen relative px-16 h-120 pt-18 '>
            <div className='grid grid-cols-12 lg:pb-0 pb-5 border-b border-(--color-border) justify-between'>
                <div className='lg:col-span-6 col-span-12 flex items-start flex-col justify-start'>
                    <Logo width={220} height={58} />
                    <p className='w-[440px] text-base md:text-lg xl:text-xl lg:h-[168px] h-[100px] text-(--color-text-desc)'>The ultimate task management solution for modern teams.</p>
                </div>
                <div className='lg:col-span-2 col-span-4'>
                    <FooterList
                        title='About us'
                        linkList = {aboutUs}
                     />
                </div>
                <div className='lg:col-span-2 col-span-4'>
                    <FooterList
                        title='Customer Support'
                        linkList = {customerSupports}
                     />
                </div>
                <div className='lg:col-span-2 col-span-4 flex flex-col gap-3 items-start'>
                    <span className='text-(--color-text) lg:text-2xl text-base md:text-lg mb-1 font-medium'>Change theme</span>
                    <DarkMode />
                </div>
            </div>

            <div className='w-full flex relative pt-10 items-center justify-between h-[100px]'>
                <span className='block lg:text-xl md:text-[16px] text-[14px] text-(--color-text)'>© 2025 NoTask. All rights reserved.</span>
                <div className='flex w-full items-center justify-between text-(--color-text-desc) gap-6'>
                    <span className='lg:text-xl md:text-[16px] text-[14px]'>Privacy Policy</span>
                    <span className='lg:text-xl md:text-[16px] text-[14px]'>Terms of Services</span>
                    <span className='lg:text-xl md:text-[16px] text-[14px]'>Cookies Policy</span>
                </div>
                
            </div>
        </footer>
    )
}