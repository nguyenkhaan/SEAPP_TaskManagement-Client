import React from 'react'
import ReactDOM from 'react-dom'
import { Gauge , gaugeClasses } from '@mui/x-charts'
import getStatusColor from '../services/getStatusColor'
function GroupStatus({
    title = 'Default Title',
    content = ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed voluptatum sunt tempore, illum harum deserunt facilis iusto. Maiores voluptatum aliquid, adipisci sed esse eos, officia, voluptas nam quasi velit obcaecati! \
    Similique voluptates saepe voluptatem quos, minima omnis illum deserunt ad non necessitatibus doloremque? Commodi eum provident voluptas a quo? Voluptatem, praesentium quam? Maxime qui numquam, aliquam odio facilis dignissimos magnam. \
    Beatae aspernatur repellat hic velit aut, ad quisquam minima quaerat accusamus in quis totam laudantium inventore? Suscipit quaerat recusandae, corporis deleniti delectus tempora aliquid necessitatibus odio optio voluptatum tenetur quasi. ',
    statusValue = 0,
    caption = 'default'
}) {
    const color = getStatusColor(caption)
    return (
        <article className='w-[402px] relative h-[153px] px-8 py-2 flex overflow-hidden rounded-2xl border bg-transparent border-[#A1A3AB] font-[Inter]'>
            <div className='flex-3 flex-col flex items-start justify-between '>
                <div className='pt-3'>
                    <h3 className='text-base line-clam-1 text-left text-black font-[Montserrat] font-medium'>{title}</h3>
                    <p className='text-(--color-text-desc) mt-1 text-[14px] line-clamp-2 text-wrap w-full leading-tight'>{content}</p>
                </div>
                <div>
                    <p className='text-[12px] text-(--color-text-desc)'>
                        Status:
                        <span style={{ color: `var(${color})` }}> {caption}</span>
                    </p>
                    <ul className='mt-2 text-[12px] text-(--color-text-desc) flex  gap-4'>
                        <li>
                            <i class="fa-regular fa-calendar mr-1 font-medium"></i>
                            Created At
                        </li>
                        <li>
                            <i class="fa-regular fa-user mr-1 font-medium"></i>
                            Team leader
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex-2 flex items-center justify-end'>
                <Gauge
                    width={112} height={112} value={statusValue} startAngle={360} endAngle={0} fontSize={20} text={`${statusValue}%`} fontWeight={500} color='black'
                    sx={(theme) => ({
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: `var(${color})`,
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                            fill: theme.palette.text.disabled,
                        },
                    })}
                />
            </div>
            <i 
                class="fa-regular fa-circle top-2 left-3 font-black absolute text-[12px]"
                style={{color : `var(${color})`}}
            ></i>
            <i class="fa-solid fa-ellipsis text-2xl right-3 top-1 absolute text-gray-600 "></i>
        </article>
    )
}
export { GroupStatus } 