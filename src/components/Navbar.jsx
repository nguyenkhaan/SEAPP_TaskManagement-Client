import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import Logo from './Logo'
import AOS from 'aos'
import checkLogin from '../services/checkLogin'

function Navbar() {
    const isLogin = checkLogin() 

    console.log("Is login: ", isLogin)

    return (
        <nav data-aos='fade-up'
             className='w-screen left-0 z-99999 bg-white fixed top-0 shadow-lg h-18 xl:px-[50px] lg:px-10 md:px-[25px] px-2.5  py-8 flex items-center justify-between'>
            <Logo />
            <div className='min-h-20 flex lg:text-[22px] md:text-[18px] text-[16px] items-center font-medium  text-black lg:gap-3 md:gap-2 gap-1 justify-evenly'>
                <Link to={isLogin ? '/' : '/register'}>
                    <motion.button
                        className='lg:px-8 md:px-5 px-3 text-black cursor-pointer'
                        initial={{ opacity: 1 }}
                        whileHover={{ color: '#FF6767' }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {isLogin? 'Sign Out' : 'Sign Up'} 
                    </motion.button>
                </Link>
                <Link to={isLogin? '/app/dashboard' : '/login'}>
                    <motion.button
                        className='py-1 lg:px-8 md:px-5 px-3 border rounded-xl bg-white text-(--color-primary) border-(--color-primary) cursor-pointer'
                        initial={{ opacity: 1 }}
                        whileHover={{ color: 'white', backgroundColor: '#FF6767', borderColor: 'Transparent' }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                        {isLogin? 'Dashboard' : 'Login'}
                    </motion.button>
                </Link>
            </div>
        </nav>
    )
}
export default Navbar