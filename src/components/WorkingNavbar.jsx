import React, {  useState } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import Logo from './Logo'
import WorkingSmallBlock from './WorkingSmallBlock'
import { getCurrentDate } from '../services/getDate'
import MyCalendar from './Calendar'

function WorkingNavbar() 
{
    const {day , month , year , weekDay} = getCurrentDate() 
    const [showCalendar, setShowCalendar ] = useState(false);
    return (
        <nav className='w-screen md:h-25 h-29 left-0 max-md:flex-col z-99999 bg-white fixed top-0 shadow-lg md:gap-12 md:pt-9 md:px-[60px] md:py-8 py-3 flex md:items-center items-start justify-between'>
            <div className='flex-1 max-md:ml-4'>
                <Logo />
            </div>
            <div className='flex-4 md:w-[720px] xl:w-full max-md:px-4 h-11 relative'>
                <input
                    className='w-full md:h-full text-(--color-text-desc) md:text-base text-lg font-semibold md:rounded-lg px-5 shadow-[0_4px_10px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_14px_rgba(0,0,0,0.15)] outline-none transition-all duration-300 rounded-md max-md:py-2'
                    placeholder='Search your task here...'
                />
                <div className='absolute md:top-0 max-md:top-1/2 max-md:-translate-y-1/2 md:right-0 right-4'>
                    <WorkingSmallBlock childrenIcon={<i class="fa-solid fa-magnifying-glass"></i>} />
                </div>
            </div>
            <div className='flex-2  flex items-center justify-between'>
                <span className='flex-1 block'>

                </span>
                <div className='flex-1 justify-center flex gap-2' >
                    <div onClick={() => setShowCalendar(e => !e)}>
                        <WorkingSmallBlock childrenIcon={<i class="fa-regular fa-calendar"></i>}/>
                    </div>
                    {showCalendar && <MyCalendar />}

                </div>
                <div className='flex-1 text-base font-medium xl:block hidden'>
                    <span className='block text-base font-medium text-black'>{weekDay}</span>
                    <span className='block text-base text-[#3ABEFF]'>{`${day}/${month}/${year}`}</span>
                </div>
            </div>
        </nav>
    )
}
export default WorkingNavbar