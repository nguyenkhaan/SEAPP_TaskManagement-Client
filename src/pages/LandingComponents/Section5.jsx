import React from 'react'
import ReactDOM from 'react-dom'
function Section5() {
    return (
        <section className='landing__section py-18  bg-[#ff6766] relative 
                        before:bg-[#ff6766] before:z-[-1] before:absolute before:top-0 before:h-full before:left-1/2 before:translate-x-[-50vw] before:w-screen'>
            <div className='w-full h-full flex items-center flex-col justify-center'>
                <h2 className='text-white w-[947px] font-medium text-[84px] leading-28 text-center'>Ready to Boost your Productivity?</h2>
                <span className='block my-6 text-[28px] w-[1142px] font-normal'>Join thousands of users who are already managing their tasks more efficiently with NoTask</span>
                <div className="flex my-8 justify-between w-[1142px] items-center">
                    <button className='w-[490px] cursor-pointer bg-white h-[100px] py-2 px-[18px] text-[#ff6766] rounded-[158px] text-[40px] font-medium shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_30px_rgba(0,0,0,0.25)] transition-all duration-300'>
                        Login
                    </button>
                    <button className='w-[490px] cursor-pointer h-[100px] py-2 px-[18px] bg-[#ff6766] text-white rounded-[158px] text-[40px] font-medium shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_30px_rgba(0,0,0,0.25)] transition-all duration-300'>
                        Sign up right now
                    </button>
                </div>

            </div>
        </section>
    )
}
export default Section5