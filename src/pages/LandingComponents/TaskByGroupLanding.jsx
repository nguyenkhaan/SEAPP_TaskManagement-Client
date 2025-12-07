import React from 'react'
import ReactDOM from 'react-dom'
import TaskByGroupLandingHeader from './TaskByGroupLandingHeader'
import TaskOverview from '../../components/TaskOverview'
function TaskByGroupLanding() {
    return (
        <article className={` xl:w-[670px] xl:h-[520px] lg:w-[620px] xl:ml-0 lg:-ml-25 lg:h-[480px] md:w-[670px] md:h-[500px] w-[400px] h-[500px] lg:mt-0 md:mt-5 mt-3 rounded-2xl flex flex-col items-start xl:px-7 lg:px-6 md:px-7 px-3 justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden  text-(--color-text) bg-(--color-background-2)`}>
            <TaskByGroupLandingHeader />
            <ul className='w-full flex-1 lg:py-3 py-2 px-0 overflow-y-scroll overflow-x-hidden wrapper h-full flex flex-col items-center pb-6'>
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
export default TaskByGroupLanding


////////