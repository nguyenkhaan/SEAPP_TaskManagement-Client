import React from 'react'
import ReactDOM from 'react-dom'
function SectionSetting({
    children, 
    header = 'Personal Information', 
    description = 'Manage your information details, including username, birthday, email address, and phone number, to ensure your account is up to date.' 
}) {
    return (
        <div className='w-full px-8 py-6 border-b border-b-gray-500 min-h-20'>
            <h2 className='font-semibold text-2xl md:text-[32px]'>
                {header}
            </h2>
            <span className='font-md text-base md:text-xl mb-4 block'>{description}</span>
            {children}
        </div>
    )
}
export default SectionSetting