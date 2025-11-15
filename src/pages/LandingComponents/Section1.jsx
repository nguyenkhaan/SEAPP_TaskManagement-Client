import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import Section1SmallBlock from './Section1SmallBlock'
import TaskByGroup from '../../components/TaskByGroup'
function Section1() {

    return (
        <div className=' bg-[#f8f9fe] pt-28 pb-8 landing__section relative before:bg-[#f8f9fe] before:z-[-1] before:absolute before:top-0 before:h-full before:left-1/2 before:translate-x-[-50vw] before:w-screen'>
            <button className='text-black rounded-3xl px-[22px] py-[13px w-[305px] h-[55px] text-base bg-white shadow-lg'>
                Boost your productivity
            </button>
            <div className='flex flex-1 gap-3 items-center justify-between pt-8'>
                <div className='flex flex-col gap-4 flex-1'>
                    {/* heading */}
                    <h2 className='text-6xl font-medium text-black'>
                        Manage your Task
                        <span className=' text-[#ff6568] block mt-2'> Efforlessly</span>
                    </h2>
                    {/* paragraph */}
                    <p className='block w-120 text-black pt-6 text-2xl'>
                        The ultimate task management solution for teams and individuals. Stay organized, meet deadlines, and achieve your goals with NoTask.
                    </p>
                    <div>
                        {/* button sign up */}
                        <motion.button 
                            className='px-5 grow-0 block py-2 w-[450px] h-[90px] mt-12 rounded-[158px] shadow-xl text-2xl cursor-pointer bg-[#ff6568]'
                            initial={{
                                scale: 1, 
                            }}
                            whileHover={{
                                scale: 1.1
                            }}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            
                            >
                            Sign Up Right Now
                        </motion.button>
                        {/* Cac so lieu danh gia */}
                        <ul className='flex text-black items-center w-100 justify-between grow-0 mt-12 divide-x-2 divide-gray-500'>
                            <Section1SmallBlock analysis={'10K+'} title={'User Rating'} />
                            <Section1SmallBlock analysis={'10K+'} title={'User Rating'} />
                            <Section1SmallBlock analysis={'10K+'} title={'User Rating'} />
                        </ul>
                    </div>

                </div>

                <div className='flex-1 flex items-center justify-center'>
                    <TaskByGroup /> 
                </div>
            </div>
        </div>
    )
}
export default Section1