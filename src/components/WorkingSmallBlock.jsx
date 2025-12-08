import React from 'react'
import ReactDOM from 'react-dom'
function WorkingSmallBlock({
    childrenIcon
})
{
    return (
        <article className='md:w-11 md:h-11 w-10 h-10 rounded-lg flex items-center justify-center text-white font-medium bg-(--color-primary) cursor-pointer hover:bg-[#df363e]'>
            {childrenIcon}
        </article>
    )
}
export default WorkingSmallBlock