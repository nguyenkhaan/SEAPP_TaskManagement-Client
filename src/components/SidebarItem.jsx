import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
function SidebarItem({
    title = 'Dashboard', 
    icon = <i class="fa-regular fa-house"></i>, 
    route = 'dashboard' 
}) {
    const changePage = () => {
        //Sau nay dua vao route de thay doi mau sang cua cai nay 
    }
    return (
        <motion.li 
            className='w-[320px] h-16 cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out px-4 py-3 rounded-2xl flex items-center justify-start gap-5 text-white text-3xl'
            onClick={changePage}
            initial={{scale: 1, opacity: 100, x: 0}} 
            whileHover={{scale: 1.1 , x:16}}
            transition={{duration: 0.3 , ease: 'easeInOut'}}
        >
            {icon}

            <span className='text-xl font-semibold'>{title}</span>
        </motion.li>
    )
}
export default SidebarItem