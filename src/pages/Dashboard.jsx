import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WorkingLayout from '../layouts/WorkingLayout'
import TodoTask from './DashboardComponents/ToDoTask'
import CompletedTask from './DashboardComponents/CompletedTask'
import TaskStatus from './DashboardComponents/TaskStatus'
import GroupStatus from './DashboardComponents/GroupStatus'
import Loading from './Loading'

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const id = setTimeout(() => setIsLoading(false), 5000)
        return () => clearTimeout(id)
    }, [])
    const currentPage = (   //currentPage la trang hien tai 
        <WorkingLayout>
            <div className='md:w-full md:h-full w-screen md:mb-20 mb-8 overflow-x-hidden flex flex-col items-center justify-between'>
                <div className='w-full flex max-md:flex-col md:items-center items-start gap-3 md:gap-4 justify-between px-4 md:px-0'>
                    <h2 className='font-medium text-3xl md:text-4xl text-black'>Welcome back Cloudian</h2>
                    <div className='items-center md:justify-evenly max-md:w-full max-md:justify-between max-md:pr-2 flex gap-6'>
                        <ul className='flex items-center justify-start gap-1'>
                            <li className='rounded-lg bg-black w-9 h-9'></li>
                            <li className='rounded-lg bg-black w-9 h-9'></li>
                            <li className='rounded-lg bg-black w-9 h-9'></li>
                            <li className='rounded-lg bg-black w-9 h-9'></li>
                        </ul>
                        <button className='w-[98px] h-9 bg-white text-(--color-primary) border-2 border-(--color-primary) rounded-lg cursor-pointer font-medium text-[14px]'>
                            <i className="fa-solid fa-user-plus mr-2"></i>
                            Invite
                        </button>
                    </div>
                </div>

                <div className='mt-8 container-- border overflow-y-auto overflow-x-hidden wrapper flex max-md:flex-col items-center md:items-start xl:gap-3 md:gap-2 border-gray-600 bg-[#F5F8FF] min-h-[760px] w-full shadow-2xl md:px-1 xl:py-6 md:pb-6 max-sm:py-5'>
                    <div className='flex-1 md:w-1/2 h-[720px] flex flex-col md:items-start  items-center justify-between gap-3'>
                        <TodoTask />
                        <CompletedTask />
                    </div>
                    <div className='flex-1 max-sm:mt-3 md:w-1/2 h-[720px]  flex flex-col max-sm:w-[392px] items-start justify-between gap-3 '>
                        <TaskStatus />
                        <GroupStatus />
                    </div>
                </div>
            </div>
        </WorkingLayout>
    )
    return (
        <Loading 
            isLoading={isLoading} 
            children={currentPage}
        /> 
    )
}

export default Dashboard
