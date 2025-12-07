import { span } from 'framer-motion/client'
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
function Logo({
    width = 160, height = 28
}) {
    return (
        <Link to={'/'} className='cursor-pointer font-bold md:text-[40px] sm:text-[30px] text-[20px]'>
            <span className='text-[#FF6767]'>No</span>
            <span className='text-(--color-text)'>Task</span>
        </Link>

    )
}
export default Logo