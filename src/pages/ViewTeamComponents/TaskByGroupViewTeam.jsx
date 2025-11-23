import React from 'react'
import ReactDOM from 'react-dom'
import TaskOverview from '../../components/TaskOverview'
function TaskByGroupViewTeam({
    width = '100%',
    height = '100%'
}) {
    return (
        <article className={`rounded-2xl flex flex-col items-start px-7 justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden  text-black`} style={{ width, height }}>
            <div className='h-26 relative text-black flex flex-col items-start justify-center py-2 gap-1 border-b mb-3 border-b-gray-400 w-full'>
                <h2 className='text-[32px] font-medium'>12 Tasks</h2>
                <div className='rounded-lg h-11 w-11 bg-(--color-primary) flex items-center justify-center absolute text-white font-medium right-4 top-7 text-xl shadow-lg cursor-pointer'>
                    <i class="fa-solid fa-filter"></i>
                </div>
            </div>
            <ul className='w-full flex-1 px-6 p-5 overflow-y-scroll overflow-x-hidden wrapper h-full flex flex-col items-center pb-6'>
                <TaskOverview width={550} />
                <TaskOverview width={550} />
                <TaskOverview width={550} />
                <TaskOverview width={550} />
                <TaskOverview width={550} />
                <TaskOverview width={550} />
                <TaskOverview width={550} />
                <TaskOverview width={550} />
                <TaskOverview width={550} />
                <TaskOverview width={550} />
                <TaskOverview width={550} />

                <li className='h-10'></li>
            </ul>
        </article>
    )
}
export default TaskByGroupViewTeam