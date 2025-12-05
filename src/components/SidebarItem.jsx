import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { BackgroundColor } from '@tiptap/extension-text-style'
function SidebarItem({
    title = 'Dashboard', 
    icon = <i class="fa-regular fa-house"></i>, 
    isActive = false,
    onClick
}) {
    const changePage = () => {
        //Sau nay dua vao route de thay doi mau sang cua cai nay 
    }

    const activeStyle = {
        scale: 1.05,
        x: 16,
        color: "var(--color-primary)",
        backgroundColor: "white",
        opacity: 1
    }
    
    const inactiveStyle = {
        scale: 1,
        x: 0,
        color: "white",
        backgroundColor: "transparent",
        opacity: 1
    }

    const isHoverStyle = {
        scale: 1.05,
        x: 16,
        color: "white",
        backgroundColor: "transparent"
    }

    return (
        <motion.li 
            className='w-[300px] h-16 cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out px-4 py-3 rounded-2xl flex items-center justify-start gap-5 text-white text-3xl'
            onClick={onClick}
            initial={isActive ? activeStyle : inactiveStyle}
            animate={isActive ? activeStyle : inactiveStyle} 
            whileHover={isActive ? activeStyle : isHoverStyle}
            transition={{duration: 0.3 , ease: 'easeInOut'}}
        >
            {icon}
            <span className='text-xl font-semibold'>{title}</span>
        </motion.li>
    )
}
export default SidebarItem