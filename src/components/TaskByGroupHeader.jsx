import React from 'react'
import ReactDOM from 'react-dom'
function TaskByGroupHeader() {
    return (
    <div className='h-30 bg-[#ff6766] flex items-center justify-start px-5 py-2 gap-4'>
        <i class="fa-solid fa-ranking-star text-white text-7xl"></i>
        <div className='inline-flex flex-col justify-between gap-3'>
            <h2 className='text-white text-4xl inline-block'>Your Task Today</h2>
            <div className='flex text-white items-center justify-between gap-3'>
                <div className='inline-flex items-center gap-1 justify-between'>
                    <i class="fa-solid fa-user-tie"></i>
                    <span>Team leader</span>
                </div>
                <div className='inline-flex items-center gap-1 justify-between'>
                    <i class="fa-solid fa-user-tie"></i>
                    <span>Team leader</span>
                </div>
            </div>
        </div>
    </div>
    )
}
export default TaskByGroupHeader