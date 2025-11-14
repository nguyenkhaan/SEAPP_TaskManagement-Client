import React from 'react'
import ReactDOM from 'react-dom'
function GroupStastic({
    teamNumbers = 7 
})
{
    return (
        <div className='relative w-[300px] h-[148px] py-7 px-6 border boder-[#B3B3B3] rounded-3xl'>
            <h2 className='font-medium text-[20px] text-black'>Total team</h2>
            <span className='text-[48px] text-[#66FF91] font-medium'>{teamNumbers}</span>
            <div className='absolute w-9 h-[31px] flex items-center justify-center text-sm rounded-xl top-[30px] left-[252px] text-white bg-[#ff6766]'>
                <i class="fa-solid fa-people-group"></i>
            </div>
        </div>
    )
}
export default GroupStastic