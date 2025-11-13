import React from 'react'
import ReactDOM from 'react-dom'
import StatisticCard from '../StatisticCard'
function Section4() {
    return (
        <div className='landing__section bg-white py-20 flex items-center justify-center'>
            <div className='w-full grid-cols-12 grid justify-center'>
                <div className='col-span-4 flex items-center justify-center'>
                    <StatisticCard />
                </div>
                <div className='col-span-4 flex items-center justify-center'>
                    <StatisticCard />
                </div>
                <div className='col-span-4 flex items-center justify-center'>
                    <StatisticCard />
                </div>
            </div>
        </div>
    )
}
export default Section4