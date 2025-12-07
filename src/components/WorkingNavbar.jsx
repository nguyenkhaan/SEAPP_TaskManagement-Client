import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import Logo from './Logo'
import WorkingSmallBlock from './WorkingSmallBlock'
import { getCurrentDate } from '../services/getDate'
import MyCalendar from './Calendar'
import WorkingSidebar from './WorkingSidebar'

function WorkingNavbar({
    showSidebar = false, 
    setShowSidebar = null 
}) {
    const { day, month, year, weekDay } = getCurrentDate()
    const [showCalendar, setShowCalendar] = useState(false)
    const searchRef = useRef(null)
    const navigate = useNavigate()

    const handleSearch = () => {
        if (searchRef.current) {
            navigate(`/app/search-task?search-result=${encodeURIComponent(searchRef.current.value)}`)
        }
    }

    return (
        <>
            {/* NAVBAR */}
            <nav className='w-screen md:h-25 h-29 left-0 max-sm:flex-col z-[99999] bg-(--color-background-2) fixed top-0 shadow-lg md:gap-12 md:pt-9 md:px-[60px] md:py-8 py-3 flex md:items-center items-start justify-between'>
                
                {/* LOGO + NÚT MỞ SIDEBAR (chỉ hiện khi < 2XL) */}
                <div className='flex-1 max-md:ml-4 flex items-center gap-4'>

                    {/* Nút menu */}
                    <button
                        className="2xl:hidden p-3 rounded-lg bg-gray-100 shadow cursor-pointer"
                        onClick={() => {
                            if (window.innerWidth <= 1280) {
                                setShowSidebar(!showSidebar) 
                            }
                        }}
                    >
                        <i className="fa-solid fa-bars text-xl"></i>
                    </button>

                    <Logo />
                </div>

                {/* Ô Search */}
                <div className='flex-4 md:w-[720px] xl:w-full max-md:px-4 h-11 relative'>
                    <input
                        className='w-full md:h-full text-(--color-text) md:text-base text-lg font-semibold md:rounded-lg px-5 shadow-[0_4px_10px_rgba(0,0,0,0.15)] focus:shadow-[0_6px_14px_rgba(0,0,0,0.15)] bg-(--color-search) outline-none transition-all duration-300 rounded-md max-md:py-2'
                        placeholder='Search your task here...'
                        ref={searchRef}
                    />
                    <div 
                        className='absolute md:top-0 max-md:top-1/2 max-md:-translate-y-1/2 md:right-0 right-4 cursor-pointer'
                        onClick={handleSearch}
                    >
                        <WorkingSmallBlock childrenIcon={<i className="fa-solid fa-magnifying-glass"></i>} />
                    </div>
                </div>


                {/* Calendar + Date */}
                <div className='flex-2 flex items-center justify-between'>
                    <span className='flex-1 hidden xl:block'></span>

                    <div className='flex-1 justify-center max-sm:hidden flex gap-2'>
                        <div onClick={() => setShowCalendar(v => !v)}>
                            <WorkingSmallBlock childrenIcon={<i className="fa-regular fa-calendar"></i>} />
                        </div>
                        {showCalendar && <MyCalendar />}
                    </div>

                    <div className='flex-1 text-base font-medium xl:block hidden'>
                        <span className='block text-base font-medium text-(--color-text)'>{weekDay}</span>
                        <span className='block text-base text-[#3ABEFF]'>{`${day}/${month}/${year}`}</span>
                    </div>
                </div>
            </nav>

            {/* SIDEBAR MOBILE DẠNG OVERLAY */}
            {showSidebar && (
                <div 
                    className="fixed inset-0 z-[99998] bg-black/40 2xl:hidden"
                    onClick={() => setShowSidebar(false)}
                >
                    <div
                        className="absolute left-0 top-0"
                        onClick={e => e.stopPropagation()}
                    >
                        <WorkingSidebar isMobile={true} onClose={() => setShowSidebar(false)} />
                    </div>
                </div>
            )}
        </>
    )
}

export default WorkingNavbar
