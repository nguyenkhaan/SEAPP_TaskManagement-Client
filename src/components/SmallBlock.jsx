import React from 'react'
import ReactDOM from 'react-dom'
function SmallBlock({
    title = '10K+',
    content = 'Active Users'
}) {
    return (
        <div className='w-[280px] h-[130px] text-white bg-(--color-block-item) gap-0.5 rounded-3xl flex flex-col items-start px-7 justify-center'>
            <h2 className='text-[38px] font-medium font-[Montserrat]'>{title}</h2>
            <span className='text-[20px] font-[Inter]'>{content}</span>
        </div>
    )
}
export default SmallBlock