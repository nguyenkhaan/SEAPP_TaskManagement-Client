import React from 'react'
import ReactDOM from 'react-dom'
import Logo  from './Logo'
import FooterList from './FooterList'
function Footer() {
    return (
        <footer className='w-[1440px] px-16 h-120  py-18'>
            <div className='grid grid-cols-12 border-b border-[#989898]'>
                <div className='col-span-6 flex items-start flex-col justify-start'>
                    <Logo width={220} height={58} /> 
                    <p className='w-[440px] text-xl h-[168px] text-(--color-text-desc)'>The ultimate task management solution for modern teams.</p>
                </div>
                <div className='col-span-3'>
                    <FooterList />
                </div>
                <div className='col-span-3'>
                    <FooterList />
                </div>
            </div>

            <div className='w-full flex pt-10 pb-7 items-center pl-8 justify-between'>
                <span className='block text-xl text-black'>2025 NoTask. All rights reserved.</span>
                <div className='flex items-center justify-between text-(--color-text-desc) gap-6'>
                    <span className='text-xl'>Privacy Policy</span>
                    <span className='text-xl'>Terms of Services</span>
                    <span className='text-xl'>Cookies Policy</span>
                </div>
            </div>

            
        </footer>
    )
}
export default Footer