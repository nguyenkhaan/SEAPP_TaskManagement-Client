import React from 'react'
import ReactDOM from 'react-dom'
import SectionSetting from './SectionSettings'
function Account() {
    return (
        <>
            <SectionSetting>
                <div className='flex w-full items-center justify-between gap-8'>

                    <button className='rounded-xl font-semibold text-lg md:text-xl text-black px-4 md:px-8 w-[276px] cursor-pointer py-3 bg-gray-300'>Log out</button>
                    <button className='rounded-xl font-semibold text-lg md:text-xl cursor-pointer text-(--color-primary) px-2 md:px-8 w-[276px] py-3 text(--color-primary) border border-(--color-primary)'>Delete Account</button>
                </div>
            </SectionSetting>
        </>
    )
}
export default Account