import React from 'react'
import ReactDOM from 'react-dom'
function GroupCard({
    title = 'Default title',
    content = 'Hoc xac suat thong ke diiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
}) {
    return (
        <div className='text-white border border-gray-200 bg-[#ff6766] relative rounded-2xl overflow-hidden w-[300px] h-56'>
            <div className='bg-white absolute flex flex-col items-start justify-between text-black w-full py-6 px-5 h-[162px] left-0 bottom-0'>
                <div className='w-full'>
                    <h2 className='text-black font-medium line-clamp-1 text-[20px]'>{title}</h2>
                    <span className='line-clamp-2 text-[15px] my-1 text-[#757070]'>{content}</span>
                </div>
                <ul className='text-[12px] mt-6 w-full text-[#757070] font-medium flex items-center justify-between'>
                    <li>
                        <i class="fa-solid fa-calendar mr-1"></i>
                        Created At
                    </li>
                    <li>
                        <i class="fa-solid fa-user mr-1"></i>
                        Team leader
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default GroupCard