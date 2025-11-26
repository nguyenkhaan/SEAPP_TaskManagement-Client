import React from 'react'
import ReactDOM from 'react-dom'
function GroupCard({
    groupTitle = 'Default title Default title Default title Default title Default title',
    groupDesc = 'Hoc xac suat thong ke diiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii dadf', 
    icon = <i class="fa-solid fa-bicycle"></i>
}) {
    return (
        <article className='border border-[#A8A8A8] bg-(--color-primary) relative rounded-2xl overflow-hidden md:w-[301px] w-[190px] md:h-[223px] h-[200px] hover:shadow-lg cursor-pointer'>
            <div className='bg-white absolute flex flex-col items-start justify-between text-black w-full md:py-6 py-4 md:px-4 px-2 md:h-44 left-0 bottom-0 h-40'>
                <div className='w-full md:mt-2'>
                    <h2 className='text-black font-medium line-clamp-2 md:text-[18px] text-[14px] font-[Montserrat]'>{groupTitle}</h2>
                    <p className='md:line-clamp-2 line-clamp-3 md:text-[11px] text-[10px] leading-tight my-1 text-(--color-text-desc)'>{groupDesc}</p>
                </div>
                <ul className='md:text-[12px] text-[10px] bottom-2 md:px-4 px-2 left-0 absolute border-t border-t-gray-500 pt-2 w-full text-(--color-text-desc) flex items-center justify-between'>
                    <li>
                        <i class="fa-regular fa-user mr-1 font-medium"></i>
                        Team leader
                    </li>
                    <li>
                        <i class="fa-regular fa-user mr-1 font-medium"></i>
                        Team member
                    </li>
                </ul>
            </div>
            <div className='bg-white z-10 absolute md:size-[54px] size-[38px] md:rounded-xl rounded-md top-4 md:top-3 left-2 md:left-5 shadow-md text-red-500 flex items-center justify-center md:text-2xl text-lg'>
                {icon}
            </div>
        </article>
    )
}
export default GroupCard