import React from 'react'
import ReactDOM from 'react-dom'
import getStatusColor from '../../services/getStatusColor'
import { getPriorityString , getStatusString } from '../../services/getStatusColor'
import purify from '../../services/purify'
import htmlToText from '../../services/htmlToText'
function ToDoItem({
    caption = 'default',
    priority = 'Moderate',
    dueTime = '18/10/2006', 
    important = false, 
    urgent = false, 
    status = '', 
    title = '', 
    description = ''  
}) {
    const color = getStatusColor(status)
    return (
        <div className='border border-gray-500 rounded-xl 
                w-[360px] 
                md:w-[342px] 
                lg:w-[400px] 
                xl:w-[402px] 
                h-[166px] px-6 py-3 
                flex flex-col justify-between relative'>
            <div className='flex w-full items-start justify-between gap-3 flex-1 h-full'>
                <div className='flex-2 min-w-0'>
                    <h2 className='font-semibold text-base line-clamp-2 text-(--color-text)'>{title}</h2>
                    <p className='text-(--color-text-desc) font-normal text-[12px] mt-1 md:mt-0 md:text-[14px] line-clamp-3'>{htmlToText(purify(description))}</p>
                </div>
                <div className='flex-1 flex items-center justify-end h-full'>
                    <div 
                        className='md:w-22 md:h-22 w-20 h-20 rounded-2xl bg-black bg-center bg-cover bg-no-repeat'
                        style={{
                            backgroundImage: `url(https://t4.ftcdn.net/jpg/07/29/63/29/360_F_729632931_H4FxaLdZNNvACTJC10VhLykO939Mo5fL.jpg)`
                        }}
                    
                    ></div>
                </div>

            </div>

            <div className='w-full flex items-center justify-between text-[10px] text-(--color-text)'>
                <span>Status: <span className='text-sky-600'>{getPriorityString(important , urgent)}</span></span>
                <span>Status: <span style={{ color: `var(${color})` }}>{getStatusString(status)}</span></span>
                <span className='text-(--color-text-desc)'>Created on: {dueTime.toString()}</span>
            </div>
            <i
                class="fa-regular fa-circle top-3 left-1 font-black absolute text-[12px]"
                style={{ color: `var(${color})` }}
            ></i>
        </div>
    )
}
export default ToDoItem