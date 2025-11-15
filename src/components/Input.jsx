import React from 'react'
import ReactDOM from 'react-dom'
function Input({
    title = 'Email'
}) {
    return (
        <div>
            <h2 className='font-medium text-2xl text-(--color-text) mb-1'>{title}</h2>
            <input
                className='w-[602px] text-(--color-text-desc) h-[60px] text-2xl rounded-xl px-5 shadow-[0_4px_10px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_14px_rgba(0,0,0,0.15)] border-[0.5px] border-(--color-text)  outline-none transition-all duration-300'
            />

        </div>

    )
}
export default Input