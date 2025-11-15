import React from 'react'
import ReactDOM from 'react-dom'
import TaskByGroupHeader from './TaskByGroupHeader'
import TaskOverview from './TaskOverview'
function TaskByGroup({
    width = 670, 
    height = 500 
}) {
    return (
        <article className={`rounded-2xl flex flex-col items-start justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden  text-black`} style={{width , height}}>
            <TaskByGroupHeader />
            <ul className='w-full flex-1 py-5 px-8 overflow-y-scroll overflow-x-hidden wrapper h-full flex flex-col items-center pb-6'>
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <TaskOverview width={609} /> 
                <li className='h-10'></li>
            </ul>
        </article>
    )
}
export default TaskByGroup


////////