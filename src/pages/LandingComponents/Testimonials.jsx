import React from 'react'
import ReactDOM from 'react-dom'
import StatisticCard from '../../components/StatisticCard'
import AOS from 'aos'

function Testimonials() {
    
    const featureItems = Array.from({length: 3}, (_, i) => ({ id: i }));

    return (
        <section data-aos='zoom-out'
                 className='landing__section bg-(--color-background-2) py-20 flex items-center justify-center mb-30  relative before:bg-(--color-background-2) before:z-[-1] before:absolute before:top-0 before:h-full before:left-1/2 before:translate-x-[-50vw] before:w-screen'>
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