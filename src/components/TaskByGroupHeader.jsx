import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
function TaskByGroupHeader({
    groupTitle = 'Xác suất thống kê', 
    description = '' , 
    leaderName = '', 
    teamID = '' 
}) {
    return (
    <article className='h-32 bg-(--color-primary) w-full flex items-center justify-start md:px-7 px-5 py-2 md:py-3 gap-4 md:gap-8'>
        <i class="fa-solid fa-ranking-star text-white md:text-7xl text-5xl"></i>
        <div className='inline-flex flex-col justify-between gap-3 md:gap-2 py-3 md:py-4 flex-1'>
            <Link to={`/app/view-team?id=${teamID}`}>
                <h2 className='text-white hover:underline text-xl w-full md:text-[32px] max-md:px-3 line-clamp-2 font-[Montserrat] font-bold'>{groupTitle}</h2>
            </Link>
            <div className='flex text-white items-center justify-between md:justify-between gap-6 md:gap-3 w-full md:w-[380px]'>
                <div className='inline-flex items-center gap-1 justify-between text-sm md:text-base'>
                    <i class="fa-solid fa-user-tie"></i>
                    <span>{leaderName}</span>
                </div>
                <div className='inline-flex items-center gap-1 justify-between text-sm md:text-base'>
                    <i class="fa-solid fa-user-tie"></i>
                    <span>Team leader</span>
                </div>
            </div>
        </div>
        <p className='text-white max-md:hidden font-[Inter] text-base line-clamp-4 w-[250px] ml-auto'>
            {description}
        </p>
    </article>
    )
}
export default TaskByGroupHeader