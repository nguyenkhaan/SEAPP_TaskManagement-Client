import React from 'react'
import ReactDOM from 'react-dom'
function SectionSetting({
    children 
})
{
    return (
        <div className='w-full px-8 py-6 border-b border-b-gray-500 min-h-20'>
            {children}
        </div>
    )
}
export default SectionSetting