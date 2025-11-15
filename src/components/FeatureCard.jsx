import React from 'react'
import ReactDOM from 'react-dom'
function FeatureCard({
    title, featureContent
}) {
    return (
        <article className='rounded-[20px] bg-(--color-secondary) flex w-[404px] h-[358px] items-start justify-center gap-4 flex-col px-9 py-5 hover:shadow-lg'>
            <div className='w-13 h-13 bg-(--color-primary) text-white text-base rounded-2xl flex items-center justify-center'>
                <i class="fa-solid fa-cloud-showers-water"></i>
            </div>
            <h3 className='text-(--color-text) text-2xl font-[Montserrat]'>{title}</h3>
            <p className='text-[20px] text-wrap w-full text-(--color-text-desc) text-left line-clamp-3 font-[Inter]'>
                {featureContent}
            </p>
        </article>
    )
}
export default FeatureCard