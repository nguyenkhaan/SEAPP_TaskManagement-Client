import React from 'react'
import ReactDOM from 'react-dom'
function FooterList({
    title = 'Company', 
    linkList = [] 
}) {
    return (
        <>
            <h3 className='font-medium text-(--color-text) lg:text-2xl md:text-xl text-left mb-3'>{title}</h3>
            <ul className='flex flex-col text-[20px] items-start justify-start gap-2 text-(--color-text-desc)'>
                {
                    linkList.map((item) => {
                        return (
                            <li><a href={item.url}>{item.name}</a></li>
                        )
                    })
                }
            </ul>
        </>
    )
}
export default FooterList