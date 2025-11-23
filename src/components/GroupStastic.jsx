import React from 'react'
import ReactDOM from 'react-dom'
function GroupStastic({
    stasticNumber = 7, 
    title = 'My Teams', 
    Color = '' 
})
{
    return (
        <article 
            className={`relative w-[301px] h-[147px] py-5 px-6 border rounded-[23px] border-[#B3B3B3]`}
            style={{color: Color}}
            >
            <div className='flex items-center justify-between'>
                <h2 className={`font-medium text-[20px]  font-[Montserrat] text-black`}>{title}</h2>
                <div 
                    className={` w-9 h-9 flex items-center justify-center text-sm rounded-full top-12`}
                    style={{backgroundColor: Color}}
                >
                    <i class="fa-brands fa-teamspeak text-white"></i>
                </div>
            </div>
            <span className='text-[48px] font-medium'>{stasticNumber}</span>
        </article>
    )
}
export default GroupStastic