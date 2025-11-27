import { span } from 'framer-motion/client'
import React from 'react'
import ReactDOM from 'react-dom'
function Logo({
    width = 160, height = 28
}) {
    return (
        <span className=' font-bold md:text-[40px] sm:text-[30px] text-[20px]'>
            <span className='text-(--color-primary)'>No</span>
            <span className='text-(--color-text)'>Task</span>
        </span>

    )
}
export default Logo