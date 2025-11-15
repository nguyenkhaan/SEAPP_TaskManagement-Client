import React from 'react'
import ReactDOM from 'react-dom'
function GroupCard({
    title = 'Default title',
    content = 'Hoc xac suat thong ke diiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii dadf'
}) {
    return (
        <article className=' border border-[#A8A8A8] bg-(--color-primary) relative rounded-2xl overflow-hidden w-[301px] h-[223px]'>
            <div className='bg-white absolute flex flex-col items-start justify-between text-black w-full py-6 px-5 h-[162px] left-0 bottom-0'>
                <div className='w-full'>
                    <h2 className='text-black font-medium line-clamp-1 text-[20px] font-[Montserrat]'>{title}</h2>
                    <span className='line-clamp-3 text-[15px] leading-tight my-1 text-(--color-text-desc)'>{content}</span>
                </div>
                <ul className='text-[12px] mt-4 w-full text-(--color-text-desc) flex items-center justify-between'>
                    <li>
                        <i class="fa-regular fa-user mr-1 font-medium"></i>
                        Team leader
                    </li>
                    <li>
                        <i class="fa-regular fa-calendar mr-1 font-medium"></i>
                        Created At
                    </li>
                </ul>
            </div>
            <div className='bg-white z-10 absolute size-[54px] rounded-xl top-6 left-5 shadow-md '>
            </div>
        </article>
    )
}
export default GroupCard