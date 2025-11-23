import React from 'react'
import ReactDOM from 'react-dom'
function GroupStastic({
    stasticNumber = 7,
    title = 'My Teams',
    Color = ''
}) {
    return (
        <article
            className={`relative md:w-[301px] w-[280px] md:h-[147px] h-[120px] md:py-5 py-3 md:px-6 px-4 border rounded-[23px] border-[#B3B3B3] max-md:flex max-md:flex-col max-md:items-start max-md:justify-between`}
            style={{ color: Color }}
        >
            <div className='flex items-center justify-between h-[42px] shrink-0'>
                <h2 className={`font-medium md:text-[18px] text-base font-[Montserrat] text-black`}>{title}</h2>
                <div
                    className={` w-9 h-9 md:flex items-center justify-center text-sm rounded-full top-12 hidden`}
                    style={{ backgroundColor: Color }}
                >
                    <i class="fa-brands fa-teamspeak text-white"></i>
                </div>
            </div>
                <span className='md:text-[48px] flex-1 text-[38px] font-medium'>{stasticNumber}</span>
        </article>
    )
}
export default GroupStastic