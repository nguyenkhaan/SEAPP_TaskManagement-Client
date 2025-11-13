import React from 'react'
import ReactDOM from 'react-dom'
function StatisticCard({
    title = '10,000+', 
    content = 'Active Users'
})
{
    return (
        <div className='w-[302px] h-[238px] bg-[#f8f9fe] rounded-2xl flex items-center justify-center gap-1 flex-col'>
            <h2 className='w-full text-center text-5xl text-[#ff6766] font-medium'>
                {title}
            </h2>
            <span className='text-[#757070]'>{content}</span>
        </div>
    )
}
export default StatisticCard