import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import WorkingLayout from '../layouts/WorkingLayout'
import ViewTeamHeader from './ViewTeamComponents/ViewTeamHeader'
import { useState } from 'react'
import getStatusColor from '../services/getStatusColor'
import TaskByGroupViewTeam from './ViewTeamComponents/TaskByGroupViewTeam'
import TeamMember from './ViewTeamComponents/TeamMember'
import ChartViewTeam from './ViewTeamComponents/ChartViewTeam'
import { Link } from 'react-router'
function ViewTeam({
    groupTitle = 'Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê',
    groupDesc = 'Xin chao cac ban',
    groupTasks = [] //Danh sach group Tasks 

}) {
    const [showDesc, setShowDesc] = useState(false)
    const [showChart, setShowChart] = useState(false)
    const [view, setView] = useState('group')  //Neu vut sang phai thi hien team, vuot tay sang trai thi hien lai group 
    const handleDescription = () => {
        setShowDesc(!showDesc) //Toggle len lai 
    }
    const handleChart = () => {
        setShowChart(!showChart)
    }

    //Trong day co phan GroupTaskTeam co TaskOverView, nhan vao 1 so tham so: 
    //     width = 609, 
    // taskTitle = 'Landing Page Design', 
    // priority = 'Moderate', 
    // status = 'Completed', 
    // due = '18/10/2006'
    const touchStart = useRef(0)
    const touchEnd = useRef(0)
    const handleTouchStart = (e) => {
        touchStart.current = e.touches[0].clientX
    }
    const handleTouchEnd = (e) => {
        touchEnd.current = e.touches[0].clientX
    }
    const handleTouch = (e) => {
        if (window.innerWidth <= 768) {
            distance = touchStart.current - touchEnd.current
            if (distance > 50) setView("team-members")   //Vuot sang phai 
            else setView("group")  //Vuot sang trai 
        }
    }

    return (
        <WorkingLayout>
            <div className='w-full h-full mb-20 '>
                {/* Header */}
                <ViewTeamHeader />
                {/* Description */}
                <div className='flex cursor-pointer items-center mt-6 md:mt-8 text-lg md:text-xl font-md text-(--color-text-desc) justify-start gap-3'>
                    {showDesc ? <i class="fa-solid fa-caret-down" onClick={handleDescription}></i> : <i class="fa-solid fa-caret-right" onClick={handleDescription}></i>}
                    <span onClick={handleDescription}>Team Description</span>
                </div>
                {showDesc ? <p className='w-full text-base pl-2 md:pl-0 text-justify mt-2 text-(--color-text-desc) line-clamp-6'>
                    {groupDesc}
                </p> : <></>}

                {/* Thong ke */}
                <div className='flex cursor-pointer text-lg items-center mt-2 md:mt-4 md:text-xl font-md text-(--color-text-desc) justify-start gap-3'>
                    {showChart ? <i class="fa-solid fa-caret-down" onClick={handleChart}></i> : <i class="fa-solid fa-caret-right" onClick={handleChart}></i>}
                    <span onClick={handleChart}>Thống kê</span>
                </div>
                {showChart ? <ChartViewTeam /> : <></>}

                {/* Hien thi so va nut tao task  */}
                <div className='w-full mt-5 rounded-md shadow-lg bg-slate-100 p-6 gap-4 flex md:flex-row flex-col md:items-center items-end md:justify-between justify-center md:h-14 h-30'>
                    <ul className='flex flex-2 max-md:w-full items-center justify-center md:justify-start gap-5 md:gap-16 font-md md:text-lg text-base'>
                        <li style={{ color: `var(${getStatusColor('Completed')})` }}>Completed: 7</li>
                        <li style={{ color: `var(${getStatusColor('in progress')})` }}>In Progress: 7</li>
                        <li style={{ color: `var(${getStatusColor('not started')})` }}>Not Started: 7</li>
                    </ul>
                    <Link to={'/app/create-task'}>
                        <button className='font-md text-white text-sm md:text-xl rounded-md bg-(--color-primary) px-3 md:px-6 cursor-pointer shadow-lg py-3'>+ Create Task</button>
                    </Link>
                </div>

                {/* Phan Task Group va Team Member */}
                <div
                    className="w-full h-[730px] mt-8 overflow-hidden relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouch}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className={`flex w-[200%] h-full transition-transform duration-300`}
                        style={{
                            transform: view === "group" ? "translateX(0)" : "translateX(-50%)",
                        }}
                    >
                        {/* View 1: Team View */}
                        <div className="w-1/2 h-full flex items-center justify-center">
                            <TaskByGroupViewTeam width="100%" />
                        </div>

                        {/* View 2: Team Member */}
                        <div className="w-1/2 h-full flex items-center justify-center">
                            <TeamMember />
                        </div>
                    </div>
                </div>
            </div>

        </WorkingLayout>
    )
}
export default ViewTeam