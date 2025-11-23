import React from 'react'
import ReactDOM from 'react-dom'
import google from '../assets/google.png';

export default function CTA({
    action = () => {} , 
    width = '100%',
    height = 50,
    title = 'login',
    backgroundColor = '#FF6767',
    color = 'White',
    border = false,
    type = '', 
    icon = '' }) {
    return (
        <button 
            style={{ width: width, height: height, backgroundColor: backgroundColor, color: color }} 
            className={` font-medium rounded-lg cursor-pointer text-[22px] cursor ${border && 'border border-(--color-text-desc)'} flex `}
            type={type}
            onClick={action}
            >
            <div className='mx-auto flex items-center'>
                {icon && <img className='size-6' src={`${google}`}/>}
                <div className={`inline-block mx-auto ${icon && 'ml-4'} `}>
                    {title}
                </div>

            </div>
        </button>
    )
}