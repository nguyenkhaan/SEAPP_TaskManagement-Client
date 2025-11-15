import React from 'react'
import ReactDOM from 'react-dom'
function GroupStastic({
    teamNumbers = 7 
})
{
    return (
        <article className='relative w-[301px] h-[147px] py-7 px-6 border rounded-[23px] border-[#B3B3B3]'>
            <h2 className='font-medium text-[20px] text-black font-[Montserrat]'>Total teams</h2>
            <span className='text-[48px] text-[#807373] font-medium font-[Inter]'>{teamNumbers}</span>
            <div className='absolute w-[31px] h-[31px] flex items-center justify-center text-sm rounded-full top-12 left-[252px] text-white bg-[#807373]'>
                <i class="fa-regular fa-people-group"></i>
            </div>
        </article>
    )
}
export default GroupStastic