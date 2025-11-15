import React from 'react'
import ReactDOM from 'react-dom'
import { Gauge , gaugeClasses } from '@mui/x-charts'
function CircleStatus({
    statusValue = 60
}) {
    return (
        <div className='flex items-center flex-col justify-between gap-2'>
            <Gauge width={160} height={160} startAngle={360} endAngle={0}
                sx={(theme) => ({
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#05A371',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: theme.palette.text.disabled,
                    },
                })}
                text={`${statusValue}%`} floodColor={'black'} color='black' fontSize={24} value={60} />
            <span className='text-[#05A371]'>
                <i class="fa-solid fa-circle "></i>
                Completed
            </span>
        </div>
    )
}
export default CircleStatus