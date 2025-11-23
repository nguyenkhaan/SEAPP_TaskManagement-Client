import React from 'react'
import ReactDOM from 'react-dom'
function GroupCard({
    groupTitle = 'Default title Default title Default title Default title Default title',
    groupDesc = 'Hoc xac suat thong ke diiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii dadf', 
    icon = <i class="fa-solid fa-bicycle"></i>
}) {
    return (
        <article className=' border border-[#A8A8A8] bg-(--color-primary) relative rounded-2xl overflow-hidden w-[301px] h-[223px]'>
            <div className='bg-white absolute flex flex-col items-start justify-between text-black w-full py-6 px-4 h-[162px] left-0 bottom-0'>
                <div className='w-full'>
                    <h2 className='text-black font-medium line-clamp-2 text-[18px] font-[Montserrat]'>{groupTitle}</h2>
                    <span className='line-clamp-3 text-[11px] leading-tight my-1 text-(--color-text-desc)'>{groupDesc}</span>
                </div>
                <ul className='text-[12px] bottom-2 px-4 left-0 absolute border-t border-t-gray-500 pt-2 w-full text-(--color-text-desc) flex items-center justify-between'>
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
            <div className='bg-white z-10 absolute size-[54px] rounded-xl top-6 left-5 shadow-md text-red-500 flex items-center justify-center text-2xl'>
                {icon}
            </div>
        </article>
    )
}
export default GroupCard