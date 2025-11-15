import React from 'react'
import ReactDOM from 'react-dom'
function TaskByGroupHeader() {
    return (
    <div className='h-30 bg-(--color-primary) flex items-center justify-start px-7 py-2 gap-4'>
        <i class="fa-solid fa-ranking-star text-white text-7xl"></i>
        <div className='inline-flex flex-col justify-between gap-3'>
            <h2 className='text-white text-4xl inline-block font-[Montserrat] font-bold'>Xác suất thống kê</h2>
            <div className='flex text-white items-center justify-between gap-3'>
                <div className='inline-flex items-center gap-1 justify-between'>
                    <i class="fa-solid fa-user-tie"></i>
                    <span>Team leader</span>
                </div>
                <div className='inline-flex items-center gap-1 justify-between'>
                    <i class="fa-solid fa-user-tie"></i>
                    <span>Team leader</span>
                </div>
            </div>
        </div>
        <p className='text-white font-[Inter] line-clamp-2 w-[250px] ml-auto'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut eius minima repellendus placeat quos harum fugiat nulla similique, maiores quibusdam autem quas inventore. Harum ipsa autem provident similique. Asperiores, repellendus.
            Illo tempore sapiente cupiditate repellat modi quam fugit, itaque nemo accusamus ipsam soluta dicta quae quis a ea, dolor sunt velit harum autem! Molestiae asperiores ad, voluptatibus eum ullam laborum.
        </p>
    </div>
    )
}
export default TaskByGroupHeader