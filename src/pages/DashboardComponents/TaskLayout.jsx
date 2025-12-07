import React from 'react'
import ReactDOM from 'react-dom'
function TaskLayout({
    styles = {} , 
    title = 'To do',
    children, 
    showDay = false
}) {
    return (
        <div 
            className='w-full! bg-(--color-box-item-2) rounded-2xl shadow-2xl p-4'
            style={ {...styles} }
            >
            <h2 className={`text-base md:text-lg text-(--color-primary) font-medium mb-${showDay? 2 : 5}`}>{title}</h2>
            {showDay && <h2 className='text-(--color-text) text-base mb-2'>June To Day</h2>} 
            {/* Vi tri chen children */}
                {children}   
        </div>
    )
}
export default TaskLayout