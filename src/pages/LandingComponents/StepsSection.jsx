import React from 'react'
import ReactDOM from 'react-dom'
import HeaderPhase from '../../components/HeaderPhase'
import StepCard from '../../components/StepCard'
function StepsSection() {
    return (

        <section className='landing__section bg-[#f8f9fe] relative before:bg-[#f8f9fe] before:z-[-1] before:absolute before:top-0 before:h-full before:left-1/2 before:translate-x-[-50vw] before:w-screen py-16'>
            <HeaderPhase title={'How It Works?'} />
            <h2 className='mt-18 lg:text-7xl md:text-5xl text-3xl text-black text-center w-full font-[Montserrat]'>
                Get Started In
            </h2>
            <h2 className='mt-2 lg:text-7xl md:text-5xl text-3xl text-[#ff6766] text-center w-full font-[Montserrat]'>
                Three Simple Steps
            </h2>
            <div className='mt-32 grid grid-cols-12 xl:w-full xl:gap-x-0 lg:gap-x-2 gap-y-6 lg:w-[1100px] mx-auto'>
                {[1, 1, 1].map((value, index) => {
                    return (
                        <div className='lg:col-span-4 col-span-12 flex justify-center'>
                            <StepCard index={index + 1} />
                        </div>
                    )
                })}
            </div>
        </section>

    )
}
export default StepsSection