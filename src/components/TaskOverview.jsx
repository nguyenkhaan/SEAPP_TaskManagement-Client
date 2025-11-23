import React from 'react'
import ReactDOM from 'react-dom'
import getStatusColor from '../services/getStatusColor'
function TaskOverview({
    width = 609, 
    taskTitle = 'Landing Page Design', 
    priority = 'Moderate', 
    status = 'Completed', 
    due = '18/10/2006'
}) {
    const color = getStatusColor(status) 
    return (
        <li style={{width: `${width}px`}} className={`rounded-2xl my-3  h-22 py-1 border-2 border-gray-300 flex px-2 gap-3 items-center justify-between bg-[#f8f9fe]`}>
            <div className='flex-1 h-full flex items-center justify-center'>
                <div className='rounded-full w-5 h-5 bg-green-600' style={{backgroundColor : `var(${color})`}}>

                </div>
            </div>
            <div className='flex-8 h-full flex justify-center flex-col'>
                <h3 className=' text-black font-medium text-2xl font-[Montserrat]'>
                    {taskTitle}
                </h3>
                <div className='flex items-center w-120 text-base mt-0.5 justify-between text-gray-400'>
                    <span className='text-gray-500'>Priority: {priority}</span>
                    <span style={{color : `var(${color})`}}>Priority: {status}</span>
                    <span className='text-(--color-desc)'>Due: 18/10/2006</span>
                </div>
            </div>
            </li>
    )
}
export default TaskOverview
