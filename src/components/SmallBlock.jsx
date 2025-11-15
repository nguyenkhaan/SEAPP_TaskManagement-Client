import React from 'react'
import ReactDOM from 'react-dom'
function SmallBlock({
    title = '10K+',
    content = 'Active Users'
}) {
    return (
        <div className='w-[298px] h-[162px] text-white bg-[#ff8484] gap-2 rounded-2xl flex flex-col items-start px-8 justify-center'>
            <h2 className='text-[48px] font-medium font-[Montserrat]'>{title}</h2>
            <span className='text-[24px] font-[Inter]'>{content}</span>
        </div>
    )
}
export default SmallBlock