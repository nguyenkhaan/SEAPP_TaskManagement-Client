import { span } from 'framer-motion/client'
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
function Logo({
    width = 160, height = 28
}) {
    return (
        <Link to={'/'} className='cursor-pointer font-bold md:text-[42px] sm:text-[36px] text-[30px]'>
            <span className='text-[#FF6767]'>No</span>
            <span className='text-(--color-text)'>Task</span>
        </Link>

    )
}
export default Logo