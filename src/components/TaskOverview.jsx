import React from 'react'
import ReactDOM from 'react-dom'
import getStatusColor from '../services/getStatusColor'
function TaskOverview({ 
    taskTitle = 'Landing Page Design', 
    priority = 'Moderate', 
    status = 'Completed', 
    due = '18/10/2006'
}) {
    const color = getStatusColor(status) 
    return (
        <li 
            className={`w-full rounded-2xl my-1 md:my-3 task__overview h-22 py-1 border-2 border-gray-300 flex px-2 gap-4 items-center justify-between bg-[#f8f9fe]`}
            style={{
                width: `calc(100% - 26px)`
            }}
            
            >
            <div className='h-full flex items-center justify-center'>
                <div className='rounded-full md:w-4 md:h-4 ml-2 w-3 h-3 bg-green-700' style={{backgroundColor : `var(${color})`}}>
                </div>
            </div>
            <div className='flex-6 xl:flex-8 h-full flex justify-center flex-col'>
                <h3 className=' text-black font-medium xl:text-2xl md:text-xl text-[18px]'>
                    {taskTitle}
                </h3>
                <div className='flex items-center w-full text-sm md:text-sm mt-0.5 justify-between text-gray-400 gap-1'>
                    <span className='text-gray-500'>Priority: {priority}</span>
                    <span style={{color : `var(${color})`}}>Priority: {status}</span>
                    <span className='text-(--color-desc)'>Due: 18/10/2006</span>
                </div>
            </div>
        </li>
    )
}
export default TaskOverview
//xl:w-[609px] lg:w-[560px] md:w-[600px] w-[560px]