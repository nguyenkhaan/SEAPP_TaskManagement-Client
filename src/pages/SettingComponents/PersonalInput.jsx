import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
function PersonalInput({
    title = 'Email',
    value,   //Mot lat sau them cai state vao
    setValue, 
    ref 
}) {
    const [input , setInput] = useState(value) 
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    return (
        <div>
            <label className='font-md text-lg md:text-xl'>{title}</label>
            <input 
                className='test-sm md:text-[18px] h-10 md:h-12 w-full border border-[#757070] bg-[#f5f8ff] font-md rounded-[10px] py-3 px-3 md:px-5' 
                onChange={handleChange}
                value={input}
            ref={ref}

                />
                
        </div>
    )
}
export default PersonalInput