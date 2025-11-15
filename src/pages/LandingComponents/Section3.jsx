import React from 'react'
import ReactDOM from 'react-dom'
import HeaderPhase from '../../components/HeaderPhase'
import StepCard from '../../components/StepCard'
function Section3() {
    return (

        <section className='landing__section bg-[#f8f9fe] relative before:bg-[#f8f9fe] before:z-[-1] before:absolute before:top-0 before:h-full before:left-1/2 before:translate-x-[-50vw] before:w-screen py-16'>
            <HeaderPhase title={'How It Works?'} />
            <h2 className='mt-18 text-7xl text-black text-center w-full'>
                Get Started In
            </h2>
            <h2 className='mt-2 text-7xl text-[#ff6766] text-center w-full'>
                Three Simple Steps
            </h2>
            <div className='mt-32 grid grid-cols-12'>
                {[1, 1, 1].map((value, index) => {
                    return (
                        <div className='col-span-4'>
                            <StepCard index={index + 1} />
                        </div>
                    )
                })}
            </div>
        </section>

    )
}
export default Section3