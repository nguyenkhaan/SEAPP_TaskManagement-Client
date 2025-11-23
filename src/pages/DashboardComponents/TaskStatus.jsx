import React from 'react'
import ReactDOM from 'react-dom'
import TaskLayout from './TaskLayout'
import CircleStatus from '../../components/CircleStatus'
function TaskStatus()
{
    return (
        <TaskLayout title='Task Status' styles={{width: 'full' , height:'264px'}}>
            <div className='w-full flex items-center justify-between overflow-hidden'>
                <CircleStatus statusValue={84} caption='Completed'/>
                <CircleStatus statusValue={46} caption='In progress'/>
                <CircleStatus statusValue={13} caption='Not started'/>
            </div>
        </TaskLayout>
    )
}
export default TaskStatus