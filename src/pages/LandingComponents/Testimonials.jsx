import React from 'react'
import ReactDOM from 'react-dom'
import StatisticCard from '../../components/StatisticCard'
function Testimonials() {
    
    const featureItems = Array.from({length: 3}, (_, i) => ({ id: i }));

    return (
        <section className='landing__section bg-white py-20 flex items-center justify-center mb-30'>
            <div className='xl:w-full grid-cols-12 grid gap-y-6 justify-center mx-auto lg:w-[1000px] w-full'>
                {/* <div className='col-span-4 flex items-center justify-center'>
                    <StatisticCard />
                </div>
                <div className='col-span-4 flex items-center justify-center'>
                    <StatisticCard />
                </div>
                <div className='col-span-4 flex items-center justify-center'>
                    <StatisticCard />
                </div> */}

                {featureItems.map(item => (
                    <div key={item.id} className='lg:col-span-4 col-span-12 flex items-center justify-center'>
                        <StatisticCard/>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Testimonials