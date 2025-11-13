import React from 'react'
import ReactDOM from 'react-dom'
function SmallBlock({
    title = '10K+',
    content = 'Active Users'
}) {
    return (
        <div className='w-[298px] h-[162px] text-white bg-[#ff8484] gap-2 rounded-2xl flex flex-col items-start px-12 justify-center'>
            <h2 className='text-5xl font-medium'>{title}</h2>
            <span className='font-medium text-2xl'>{content}</span>
        </div>
    )
}
export default SmallBlock