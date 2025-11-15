//Dess case header phase trong nay 
import React from 'react'
import ReactDOM from 'react-dom'
function HeaderPhase({
    title = ' Features '
})
{
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='rounded-4xl inline-block w-[368px] h-[68px] leading-[68px] text-center text-[36px] shadow-[6px_0_8px_rgba(0,0,0,0.3)] border bg-[#f8f9fe] border-black px-12 text-3xl font-medium text-[#ff6766]'>
                {title}
            </div>
        </div>
    )
}
export default HeaderPhase