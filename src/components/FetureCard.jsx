import React from 'react'
import ReactDOM from 'react-dom'
function FeatureCard({
    title, featureContent
}) {
    return (
        <div className='col-span-4 w-[404px] h-[358px] flex justify-center'>
            <div className='rounded-2xl bg-[#f8f9fe] flex w-full h-full items-start justify-center gap-4 flex-col px-9 py-5'>
                <div className='w-13 h-13 bg-[#ff6766] text-white text-base rounded-2xl flex items-center justify-center'>
                    <i class="fa-solid fa-cloud-showers-water"></i>
                </div>
                <h3 className='text-black text-2xl'>Task management</h3>
                <p className='text-[20px] text-wrap w-full  text-gray-500 text-left line-clamp-3'>
                    Create, organize, and track tasks with ease. Set Priorities, deadlines, and custom categories
                </p>
            </div>
        </div>

    )
}
export default FeatureCard