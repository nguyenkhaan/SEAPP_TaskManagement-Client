import React from 'react'
import ReactDOM from 'react-dom'
import WorkingLayout from '../layouts/WorkingLayout'
import ViewTeamHeader from './ViewTeamComponents/ViewTeamHeader'
import { useState } from 'react'
import getStatusColor from '../services/getStatusColor'
import TaskByGroupViewTeam from './ViewTeamComponents/TaskByGroupViewTeam'
import TeamMember from './ViewTeamComponents/TeamMember'
import ChartViewTeam from './ViewTeamComponents/ChartViewTeam'
function ViewTeam({
    groupTitle = 'Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê',
    groupDesc = 'Xin chao cac ban',
    groupTasks = [] //Danh sach group Tasks 

}) {
    const [showDesc, setShowDesc] = useState(false)
    const handleDescription = () => {
        setShowDesc(!showDesc) //Toggle len lai 
    }


    //Trong day co phan GroupTaskTeam co TaskOverView, nhan vao 1 so tham so: 
    //     width = 609, 
    // taskTitle = 'Landing Page Design', 
    // priority = 'Moderate', 
    // status = 'Completed', 
    // due = '18/10/2006'


    return (
        <WorkingLayout>
            <div className='w-full h-full mb-20 '>
                {/* Header */}
                <ViewTeamHeader />
                {/* Description */}
                <div className='flex cursor-pointer items-center mt-8 text-xl font-md text-(--color-text-desc) justify-start gap-3'>
                    {showDesc ? <i class="fa-solid fa-caret-down" onClick={handleDescription}></i> : <i class="fa-solid fa-caret-right" onClick={handleDescription}></i>}
                    <span onClick={handleDescription}>Team Description</span>
                </div>
                {showDesc ? <p className='w-full text-base text-justify mt-2 text-(--color-text-desc) line-clamp-6'>
                    {groupDesc}
                </p> : <></>}
                <div className='w-full mt-5 rounded-md shadow-lg bg-slate-100 p-6 gap-4 flex items-center justify-between h-14'>
                    <ul className='flex flex-2 items-center justify-start gap-16 font-md text-lg'>
                        <li style={{ color: `var(${getStatusColor('Completed')})` }}>Completed: 7</li>
                        <li style={{ color: `var(${getStatusColor('in progress')})` }}>In Progress: 7</li>
                        <li style={{ color: `var(${getStatusColor('not started')})` }}>Not Started: 7</li>
                    </ul>
                    <button className='font-md text-white text-xl rounded-md bg-(--color-primary) px-6 cursor-pointer shadow-lg py-3'>+ Create Task</button>
                </div>

                {/* Phan Task va Team Member */}
                <div className='w-full h-[730px]  gap-6 mt-8 flex items-center justify-between'>
                    <div className='flex-3  h-full'>
                        <TaskByGroupViewTeam width='620px' />
                    </div>
                    <div className='flex-2  h-full'>
                        <TeamMember />
                    </div>
                </div>
                {/* Thong ke theo bieu do tron  */}
                <ChartViewTeam /> 
            </div>

        </WorkingLayout>
    )
}
export default ViewTeam