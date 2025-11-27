import React from 'react'
import ReactDOM from 'react-dom'
import SectionSetting from './SectionSettings'
function Account() {
    return (
        <>
            <SectionSetting>
                <h2 className='font-semibold text-[32px]'>
                    Account
                </h2>
                <span className='font-md text-xl mb-4 block'>Check it out!!!</span>
                <div className='flex w-full items-center justify-between gap-8'>

                    <button className='rounded-xl font-semibold text-xl text-black px-8 w-[276px] cursor-pointer py-3 bg-gray-300'>Log out</button>
                    <button className='rounded-xl font-semibold text-xl cursor-pointer text-(--color-primary) px-8 w-[276px] py-3 text(--color-primary) border border-(--color-primary)'>Delete Account</button>
                </div>
            </SectionSetting>
        </>
    )
}
export default Account