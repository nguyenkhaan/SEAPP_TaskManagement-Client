import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import AOS from 'aos'

function CTASection() {
    return (
        <section className='landing__section py-18  bg-(--color-primary) relative 
                        before:bg-(--color-primary) before:z-[-1] before:absolute before:top-0 before:h-full before:left-1/2 before:translate-x-[-50vw] before:w-screen'>
            <div className='w-full h-full flex items-center flex-col justify-center'>
                <h2 data-aos='zoom-in' className='text-white lg:w-[947px] md:w-[900px] w-[400px] font-medium lg:text-[84px] md:text-[70px] text-[38px] lg:leading-28 md:leading-20 leading-13 text-center'>Ready to Boost your Productivity?</h2>
                <span data-aos='zoom-in' className='text-white block my-6 text-[28px] xl:w-[1142px] lg:w-[1100px] md:w-[800px] w-[400px] text-center font-normal'>Join thousands of users who are already managing their tasks more efficiently with NoTask</span>
                <div className="flex my-8 justify-between xl:w-[1142px] lg:w-[1050px] md:w-[800px] md:flex-row flex-col gap-10 items-center">
                    <Link to='/login'>
                        <button data-aos='fade-right' className='lg:w-[490px] md:w-[370px] w-[350px] cursor-pointer bg-white lg:h-[100px] md:h-[90px] h-[80px] py-2 px-[18px] text-(--color-primary) rounded-[158px] xl:text-[40px] md:text-[32px] text-[28px] font-medium shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_30px_rgba(0,0,0,0.25)] transition-all duration-300'>
                            Login
                        </button>

                    </Link>
                    <Link to={'/register'}>
                        <button data-aos='fade-left' className='lg:w-[490px] md:w-[370px] w-[350px] cursor-pointer lg:h-[100px] md:h-[90px] h-[80px] py-2 px-[18px] bg-(--color-primary) text-white rounded-[158px] xl:text-[40px] md:text-[32px] text-[28px] font-medium shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_30px_rgba(0,0,0,0.25)] transition-all duration-300'>
                            Sign up right now
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    )
}
export default CTASection