import React from 'react'
import ReactDOM from 'react-dom'
import TaskLayout from './TaskLayout'
import CircleStatus from '../../components/CircleStatus'
function TaskStatus()
{
    return (
        <TaskLayout title='Task Status'>
            <div className='w-full min-h-[264px] flex items-center flex-wrap max-sm:justify-evenly md:justify-evenly xl:justify-between overflow-hidden'>
                <CircleStatus statusValue={84} caption='Completed'/>
                <CircleStatus statusValue={46} caption='In progress'/>
                <CircleStatus statusValue={13} caption='Not started'/>
            </div>
        </TaskLayout>
    )
}
export default TaskStatus