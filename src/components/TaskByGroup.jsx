import React from 'react'
import ReactDOM from 'react-dom'
import TaskByGroupHeader from './TaskByGroupHeader'
import TaskOverview from './TaskOverview'
function TaskByGroup({
    width = 984,
    height = 680,
    groupTitle = 'Xác suất thống kê'
}) {
    //lat nua tao them mot color picker o day 
    return (
        <article className={`rounded-2xl flex task__group flex-col items-start justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden  text-black`} style={{ width, height }}>
            <TaskByGroupHeader groupTitle={groupTitle} />
            <ul className='w-full flex-1 py-5 px-6 md:px-8 overflow-y-scroll overflow-x-hidden wrapper h-full flex flex-col items-center pb-4 md:pb-6'>
                <TaskOverview width={850} taskTitle='Landing Page Design' priority='Moderate' status={'Completed'} />
                <TaskOverview width={850} taskTitle='Landing Page Design' priority='Moderate' status={'Completed'} />
                <TaskOverview width={850} taskTitle='Landing Page Design' priority='Moderate' status={'Completed'} />
                <TaskOverview width={850} taskTitle='Landing Page Design' priority='Moderate' status={'Completed'} />
                <TaskOverview width={850} taskTitle='Landing Page Design' priority='Moderate' status={'Completed'} />
                <TaskOverview width={850} taskTitle='Landing Page Design' priority='Moderate' status={'Completed'} />
                <li className='md:h-10 h-4'></li>
            </ul>
        </article>
    )
}
export default TaskByGroup


////////