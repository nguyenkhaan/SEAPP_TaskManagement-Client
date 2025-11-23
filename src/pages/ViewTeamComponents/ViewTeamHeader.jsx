import React from 'react'
import ReactDOM from 'react-dom'
function ViewTeamHeader({
    groupTitle = 'Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê Xác suất thống kê',
}) {
    return (
        <div className='w-full h-[220px] flex py-6 px-8 font-md items-center justify-between bg-(--color-primary) rounded-3xl shadow-xl gap-12'>
            <div className='flex flex-2 flex-col h-full gap-5 justify-between items-start text-white'>
                <h2 className='text-[48px] line-clamp-2'>
                    {groupTitle}
                </h2>
                <div className='flex w-[320px] items-center justify-between'>
                    <div>
                        <i class="fa-solid fa-user"></i>
                        <span>Alice Aladin</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-user"></i>
                        <span>Alice Aladin</span>
                    </div>
                </div>
            </div>

            <div className='flex-1 flex items-center justify-end'>
                <div className='flex items-center text-(--color-primary) text-6xl rounded-3xl bg-white justify-center h-[118px] w-[118px] shadow-xl'>
                    <i class="fa-regular fa-cloud  "></i>

                </div>
            </div>

        </div>
    )
}
export default ViewTeamHeader