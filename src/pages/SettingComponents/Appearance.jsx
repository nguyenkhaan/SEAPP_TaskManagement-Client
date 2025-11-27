import React from 'react'
import ReactDOM from 'react-dom'
import SectionSetting from './SectionSettings'
function Appearance() {
    const setDarkMode = () => {
        document.querySelector('body').setAttribute('data-app-theme', 'dark')
    }
    const setLightMode = () => {
        document.querySelector('body').setAttribute('data-app-theme', 'light')
    }
    return (
        <>
            <SectionSetting>
                <h2 className='font-semibold text-[32px]'>
                    Appearance
                </h2>
                <span className='font-md text-xl mb-4 block'>Change to dark mode for preventing bug</span>
                <div className='flex items-center justify-start gap-8'>
                    <button className='rounded-xl font-semibold text-xl cursor-pointer text-(--color-primary) px-8 py-3 text(--color-primary) border border-(--color-primary)' onClick={setLightMode}>Light</button>
                    <button className='rounded-xl font-semibold text-xl text-white px-8 cursor-pointer py-3 bg-black' onClick={setDarkMode}>Dark</button>
                </div>
            </SectionSetting>
        </>
    )
}
export default Appearance