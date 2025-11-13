import React from 'react'
import ReactDOM from 'react-dom'
import TaskByGroupHeader from './TaskByGroupHeader'
import TaskOverview from './TaskOverview'
function TaskByGroup() {
    return (
        <div className='w-[670px] h-[500px] rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden  text-black'>
            <TaskByGroupHeader />
            <ul className='w-full py-5 px-8 overflow-y-scroll wrapper max-h-100'>
                <TaskOverview /> 
                <TaskOverview /> 
                <TaskOverview /> 
                <TaskOverview /> 
                <TaskOverview /> 
                <TaskOverview /> 
                <TaskOverview /> 
                <TaskOverview /> 
                <li className="h-6"></li> 
            </ul>
        </div>
    )
}
export default TaskByGroup


////////