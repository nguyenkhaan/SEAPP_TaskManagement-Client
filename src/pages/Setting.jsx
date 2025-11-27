import React from 'react'
import ReactDOM from 'react-dom'
import WorkingLayout from '../layouts/WorkingLayout'
import SectionSetting from './SettingComponents/SectionSettings'
import Avatar from '../components/Avatar'
import UpdatePersonalInformation from './SettingComponents/UpdatePersonalInformation'
import UpdatePassword from './SettingComponents/UpdatePassword'
import Appearance from './SettingComponents/Appearance'
import Account from './SettingComponents/Account'
function Setting() {
    return (
        <WorkingLayout>
            <h2 className='font-md text-4xl'>Settings</h2>
            <span className='font-md block my-2 text-xl'>Manage your profile, preferences, and app settings</span>

            <div className='flex flex-col shadow-[15px_10px_25px_rgba(0,0,0,0.3)] items-start justify-start w-full bg-white min-h-200 mb-16 overflow-hidden border border-gray-500 rounded-xl mt-6'>
                <SectionSetting>
                    <>
                        <h2 className='font-semibold text-[32px]'>
                            Profile
                        </h2>
                        <span className='font-md text-xl mb-4 block'>View and edit your personal profile information, including your name and profile picture.</span>

                        <Avatar width={110} height={110} />

                    </>
                </SectionSetting>
                {/* Update thong tin ca nhan  */}
                <UpdatePersonalInformation /> 
                 {/* Cap nhat lai Mat khau  */}
                <UpdatePassword /> 
                {/* Cap nhat lai theme giao dien  */}
                <Appearance /> 
                {/* quan ly tai khoan  */}
                <Account /> 
            </div>

           



        </WorkingLayout>
    )
}
export default Setting