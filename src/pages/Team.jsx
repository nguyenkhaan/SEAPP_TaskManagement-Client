import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import { easeInOut, motion } from 'framer-motion'
import WorkingLayout from '../layouts/WorkingLayout'
import GroupStastic from '../components/GroupStastic'
import GroupCard from '../components/GroupCard'
import Modal from '../components/modal'
import { makeCode } from '../services/randomCode'
function Team() {
    const [showModal, setShowModal] = useState(false)
    return (
        <WorkingLayout>
            <div className='w-full h-full mb-20'>
                <h2 className='text-black md:text-4xl text-3xl font-semibold max-md:px-2'>Teams</h2>
                <h2 className='text-black max-md:px-2 text-sm font-medium md:text-[20px] my-1'>Manage and collaborate with your friends</h2>

                <input
                    className='md:w-[602px] w-full md:h-[42px] h-9 md:rounded-xl rounded-lg px-5 text-gray-600 font-medium shadow-[0_4px_10px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_14px_rgba(0,0,0,0.15)] outline-none transition-all duration-300'
                    placeholder='Enter your teamm'
                />

                <div className='mt-8 md:border overflow-x-hidden overflow-y-scroll wrapper border-gray-600 rounded-md py-3 px-4 min-h-[700px] w-full'>
                    <div className='w-full flex items-center justify-between gap-3'>
                        <GroupStastic stasticNumber={7} title='Total Teams' Color='#7f7373' />
                        <GroupStastic stasticNumber={20} title='Total Tasks' Color='#bd7d7e' />
                        <GroupStastic stasticNumber={39} title='Working Tasks' Color='#109628' />

                    </div>
                    <div className='my-4 w-full min-h-40 py-8 500 grid grid-cols-12 md:gap-x-6 gap-x-3 md:gap-y-5 gap-y-3'>
                        <div className='md:col-span-4 col-span-6'>
                            <GroupCard />
                        </div>
                        <div className='md:col-span-4 col-span-6'>
                            <GroupCard />
                        </div>
                        <div className='md:col-span-4 col-span-12'>
                            <GroupCard />
                        </div>

                    </div>
                </div>
                <motion.button
                    className='absolute bg-(--color-primary) text-sm md:text-xl shadow-lg text-white font-medium md:px-5 md:py-4 py-3 px-2 rounded-md md:rounded-xl md:top-0 top-6 md:right-0 right-4 cursor-pointer'
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ transition: 'all', ease: 'easeInOut', duration: 0.3 }}
                    onClick={() => setShowModal(true)}
                    type='button'
                >
                    + Create team
                </motion.button>
            </div>
            {showModal && <Modal showModal={setShowModal} code={makeCode(8)} />}

        </WorkingLayout>
    )
}
export default Team