import React from 'react'
import ReactDOM from 'react-dom'
function TaskByGroupLandingHeader() {
    return (
    <div className='h-30 relative text-black flex flex-col items-start justify-end py-2 gap-1 border-b mb-3 border-b-gray-400 w-full'>
            <h2 className='lg:text-[20px] md:text-[18px] text-[16px] inline-block font-[Montserrat] font-normal'>Today Progress</h2>
            <h2 className='lg:text-[32px] md:text-[28px] text-[24px] font-medium'>12 Tasks</h2>
            <div className='rounded-full lg:h-15 lg:w-15 md:h-13 md:w-13 h-12 w-12 bg-(--color-primary) flex items-center justify-center absolute text-white font-medium right-4 top-7 lg:text-lg md:text-[14px] text-[12px]'>99%</div>
    </div>
    )
}
export default TaskByGroupLandingHeader