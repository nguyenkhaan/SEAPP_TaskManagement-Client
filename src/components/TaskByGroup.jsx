import React from 'react'
import ReactDOM from 'react-dom'
import TaskByGroupHeader from './TaskByGroupHeader'
import TaskOverview from './TaskOverview'
function TaskByGroup() {
    return (
        <article className='w-[984px] h-[600px] rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden  text-black'>
            <TaskByGroupHeader />
            <ul className='w-full py-5 px-8 overflow-y-scroll wrapper h-full flex flex-col items-center'>
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
                <TaskOverview width={700} /> 
            </ul>
        </article>
    )
}
export default TaskByGroup


////////