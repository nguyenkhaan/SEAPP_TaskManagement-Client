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
                <div className='flex items-center justify-between md:justify-start gap-8'>
                    <button className='rounded-xl font-semibold text-lg md:text-xl cursor-pointer text-(--color-primary) md:px-8 px-10 py-2 md:py-3 text(--color-primary) border border-(--color-primary)' onClick={setLightMode}>Light</button>
                    <button className='rounded-xl font-semibold text-lg md:text-xl text-white px-10 md:px-8 cursor-pointer py-2 md:py-3 bg-black' onClick={setDarkMode}>Dark</button>
                </div>
            </SectionSetting>
        </>
    )
}
export default Appearance