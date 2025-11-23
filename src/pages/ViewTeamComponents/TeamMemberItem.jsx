import React from 'react'
import ReactDOM from 'react-dom'
function TeamMemberItem() {
    return (
        <li className='w-full shrink-0 px-3 py-4 h-[82px] bg-[#f5f8ff] border border-gray-400 rounded-2xl flex items-center justify-start gap-4'>
            <div className='w-11 flex items-center justify-center h-11 rounded-full font-md text-white bg-(--color-primary)'>
                <i class="fa-regular fa-user"></i>
            </div>
            <div className='flex-1 flex flex-col items-start justify-between'>
                <span className='line-clamp-1 text-black font-md text-xl'>Jane Smith</span>
                <span className='font-md text-base'>Leader</span>
            </div>
        </li>
    )
}
export default TeamMemberItem