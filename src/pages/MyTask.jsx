import React from 'react'
import ReactDOM from 'react-dom'
import WorkingLayout from '../layouts/WorkingLayout'
import TaskByGroup from '../components/TaskByGroup'
function MyTask() {
    const colorHeaders = [
        '', '' , '' , '' , '' //Khi bam vao va thay doi, se lam thay doi cai colorHeasers trong day => 
            //Cap nhat lai local Storage 
    ]
    return (
        <WorkingLayout>
            <div className='w-full min-h-200 pb-20'>
                {/* Header */}
                <div className='w-full flex max-md:px-6 items-center justify-between'>
                    <h2 className='font-md text-[28px] md:text-[40px]'>
                        My Tasks
                    </h2>
                    <div className='md:w-11 md:h-11 w-10 h-10 bg-(--color-primary) rounded-md md:rounded-lg flex items-center justify-center'>
                        <i class="fa-solid fa-filter font-semibold text-white text-xl md:text-2xl"></i>
                    </div>

                </div>
                <span className='block font-md text-base max-md:px-6 md:text-xl text-black'>Manage and monitor your tasks</span>
                <div className='flex w-full min-h-30 flex-col md:items-start items-center justify-start mt-6 gap-6 md:gap-7'>
                    <TaskByGroup width={'100%'} groupTitle={'Xác suất thống kê'} />
                    <TaskByGroup width={'100%'} groupTitle={'Pháp luật đại cương'} />
                    <TaskByGroup width={'100%'} groupTitle={'Kinh tế chính trị Mác - Lê Nin'} />
                </div>
            </div>

        </WorkingLayout>
    )
}
export default MyTask