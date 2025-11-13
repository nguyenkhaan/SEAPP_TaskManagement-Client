//Dess case header phase trong nay 
import React from 'react'
import ReactDOM from 'react-dom'
function HeaderPhase({
    title
})
{
    return (
        <div className='w-full flex items-center justify-center'>
            <button className='rounded-4xl w-[286px] h-[68px] text-center shadow-[6px_0_8px_rgba(0,0,0,0.3)] border bg-[#f8f9fe] border-black px-12 text-3xl font-medium text-[#ff6766] py-3'>
                {title}
            </button>
        </div>
    )
}
export default HeaderPhase