import React from 'react'
import ReactDOM from 'react-dom'
import TaskLayout from './TaskLayout'
import CircleStatus from '../../components/CircleStatus'
import { useQuery } from '@tanstack/react-query'
import TaskServices from '../../services/TaskServices'
import Spinner from '../../components/Spinner'
function TaskStatus()
{
    const {data , isPending , error} = useQuery({
        queryKey: ['tasks-statistics'], 
        queryFn: async () => {
            const responseData = await TaskServices.getTaskStatisticByUser() 
            // console.log('Log ra tu task status: ' , responseData.data) 
            return responseData.data   
        }
    })
    if (isPending || !data) return <Spinner /> 
    return (
        <TaskLayout title='Task Status'>
            <div className='w-full min-h-[264px] flex items-center flex-wrap max-sm:justify-evenly md:justify-evenly xl:justify-between overflow-hidden'>
                <CircleStatus statusValue={data.data.completedPercentage} caption='Completed'/>
                <CircleStatus statusValue={data.data.inProgressPercentage} caption='In progress'/>
                <CircleStatus statusValue={data.data.toDoPercentage} caption='Not started'/>  
            </div>
        </TaskLayout>
        //data.data.totalTasks 
    )
}
export default TaskStatus