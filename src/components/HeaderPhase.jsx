//Dess case header phase trong nay 
import React from 'react'
import ReactDOM from 'react-dom'
function HeaderPhase({
    title = ' Features '
})
{
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='rounded-4xl inline-block lg:w-[368px] lg:h-[68px] w-[320px] h-[55px] lg:leading-[68px] leading-[55px] text-center text-2xl shadow-[6px_0_8px_rgba(0,0,0,0.3)] border bg-[#f8f9fe] border-black lg:px-12 px-8 lg:text-3xl font-medium text-[#ff6766]'>
                {title}
            </div>
        </div>
    )
}
export default HeaderPhase