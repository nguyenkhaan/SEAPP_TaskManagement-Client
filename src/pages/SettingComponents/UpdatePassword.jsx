import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import MessageLog from '../../components/MessageLog'
import SectionSetting from './SectionSettings'
function UpdatePassword() {
    const [showLog, setShowLog] = useState(0)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const oldPassword = formData.get('oldPassword')
        const newPassword = formData.get('newPassword')
        console.log(oldPassword, newPassword)
        // if (oldPassword == newPassword) 
        //     onSubmit() 
        // else onError() 
        onSubmit()
    }

    const onSubmit = () => {
        setShowLog(1)
    }
    const onError = () => {
        setShowLog(-1)
    }
    return (
        <SectionSetting>
            <>
                <h2 className='font-semibold text-[32px]'>
                    Password
                </h2>
                <span className='font-md text-xl mb-4 block'>Update your password for better security.</span>

                <form id='change-password-form' className='w-full grid grid-cols-2 items-center justify-between gap-x-16' onSubmit={handleSubmit}>
                    <div>
                        <label className='font-md text-xl'>Old Password</label>
                        <input
                            className='test-sm md:text-[18px] h-10 md:h-12 w-full border border-[#757070] bg-[#f5f8ff] font-md rounded-[10px] py-3 px-3 md:px-5'
                            type='password'
                            onCopy={(e) => {
                                e.preventDefault()
                                return false
                            }}
                            name='oldPassword'
                        />

                    </div>
                    <div>
                        <label className='font-md text-xl'>New Password</label>
                        <input
                            className='test-sm md:text-[18px] h-10 md:h-12 w-full border border-[#757070] bg-[#f5f8ff] font-md rounded-[10px] py-3 px-3 md:px-5'
                            type='password'
                            name='newPassword'
                        />

                    </div>
                </form>
                <div className='w-full flex items-center mt-4 justify-end'>
                    <button
                        form='change-password-form'
                        className='px-7 text-white cursor-pointer font-md bg-(--color-primary) py-3 rounded-xl'
                        type='submit'
                    >
                        Save Changes</button>
                </div>
            </>
            <MessageLog setShowLog={setShowLog} showLog={showLog} message={((showLog == 1) ? 'Update thành công' : 'Update thất bại')} />
        </SectionSetting>
    )
}
export default UpdatePassword