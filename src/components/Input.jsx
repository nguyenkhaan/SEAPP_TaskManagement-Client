import React from 'react'
import ReactDOM from 'react-dom'
function Input({
    title = 'Email'
}) {
    return (
        <div className='w-full'>
            <h2 className='font-semibold text-[20px] font-[Montserrat] text-(--color-text) mb-1'>{title}</h2>
            <input
                className='w-full text-(--color-text-desc) h-[45px] text-[18px] rounded-[5px] px-3 shadow-[0_4px_10px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_14px_rgba(0,0,0,0.15)] border-[0.5px] border-(--color-text)  outline-none transition-all duration-300'
            />

        </div>

    )
}
export default Input