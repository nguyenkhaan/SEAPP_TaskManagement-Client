//Sau khi lam xong 10K+ Activa User thi cop code vao day de tao thanh Small Block
import React from 'react'
import ReactDOM from 'react-dom'
function Section1SmallBlock({
    analysis,
    title
}) {
    return (
        <li className='flex-1 flex flex-col text-center items-center justify-center px-3'>
            <h3 className='text-2xl mb-2'>{analysis}</h3>
            <span className='text-base'>{title}</span>
        </li>
    )
}
export default Section1SmallBlock