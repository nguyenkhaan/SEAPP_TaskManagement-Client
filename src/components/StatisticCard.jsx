import React from 'react'
import ReactDOM from 'react-dom'
function StatisticCard({
    title = '10,000+', 
    content = 'Active Users'
})
{
    return (
        <article className='w-[302px] h-[238px] bg-(--color-secondary) rounded-2xl flex items-center justify-center gap-3 flex-col'>
            <h2 className='w-full text-center text-5xl text-(--color-primary) font-medium font-[Montserrat]'>
                {title}
            </h2>
            <span className='text-(--color-text-desc) font-[Inter] text-[20px]'>{content}</span>
        </article>
    )
}
export default StatisticCard