import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
function PersonalInput({
    title = 'Email',
    value,   //Mot lat sau them cai state vao
    setValue, 
    ref, 
}) {
    const [input , setInput] = useState(value) 
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    return (
        <div>
            <label className='font-md text-lg md:text-xl text-(--color-text)'>{title}</label>
            <input 
                className='test-sm md:text-[18px] text-(--color-text) h-10 md:h-12 w-full border border-[#757070] bg-(--color-block-item-2) font-md rounded-[10px] py-3 px-3 md:px-5' 
                onChange={handleChange}
                value={input}
                ref={ref}
                style={title === 'Email Address'? {cursor: 'not-allowed' , opacity: 40 ,} : {}}
                
                />
                
        </div>
    )
}
export default PersonalInput