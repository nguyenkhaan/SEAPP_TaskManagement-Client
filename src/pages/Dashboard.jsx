import React from 'react'
import ReactDOM from 'react-dom'
import WorkingLayout from '../layouts/WorkingLayout'
import TodoTask from './DashboardComponents/ToDoTask'
import CompletedTask from './DashboardComponents/CompletedTask'
import TaskStatus from './DashboardComponents/TaskStatus'
import GroupStatus from './DashboardComponents/GroupStatus'
function Dashboard() {
    return (
        <WorkingLayout>
            {/* Heading Dashoboard */}
            <div className='w-full h-full mb-20'>
                <div className='w-full flex items-center justify-between'>
                    <h2 className='font-medium text-4xl text-black'>Welcome back Cloudian</h2>
                    <div className='items-center justify-evenly flex gap-6'>
                        <ul className='flex items-center justify-start gap-1'>
                            <li className='rounded-lg bg-black w-9 h-9'></li>
                            <li className='rounded-lg bg-black w-9 h-9'></li>
                            <li className='rounded-lg bg-black w-9 h-9'></li>
                            <li className='rounded-lg bg-black w-9 h-9'></li>
                        </ul>
                        <button className='w-[98px] h-9 bg-white text-(--color-primary) border-2 border-(--color-primary) rounded-lg cursor-pointer font-medium text-[14px]'>
                            <i class="fa-solid fa-user-plus mr-2"></i>
                            Invite
                        </button>
                    </div>


                </div>
                <div className='mt-8 border overflow-y-scroll wrapper flex items-start gap-3 border-gray-600 bg-[#F5F8FF] min-h-[760px] w-full shadow-2xl p-6'>
                    <div className='flex-1 h-[720px] flex flex-col justify-between gap-3'>
                        <TodoTask /> 
                        <CompletedTask /> 
                    </div>
                    <div className='flex-1 h-[720px] flex flex-col justify-between gap-3'>
                        <TaskStatus /> 
                        <GroupStatus /> 
                    </div>
                </div>
            </div>
        </WorkingLayout>
    )
}
export default Dashboard