import React from 'react'
import ReactDOM from 'react-dom'
import TwoColumnLayout from '../layouts/TwoColumnLayout'

export default function LoginPage()
{
    const leftContent = (
        <div className='h-full w-full bg-(--color-primary) ml-[50] text-white'>
            <div class='introduction' className='font-[Montserrat]'>
                <h1 className='text-[54px] w-[555px] '>Welcome back to NoTask</h1>
                <p>Continue managing your tasks and boosting your productivity.</p>
            </div>

            <div class='statistic' className='grid-cols-2 grid-rows-2'>

            </div>
        </div>
    )

    const rightContent = (
        <div className='h-full w-full bg-white pr-[50] '>
            <div class="top-content" className='font-[Montserrat]'>
                <h1 className='text-[#FF6767] '>NoTask</h1>
                <p className='text-[#403D3D] '>Welcome back! Please sign in to continue</p>
            </div>

            <div class="input">
                {/* email */}
                {/* password */}

            </div>

            <div class="login-btn">

            </div>
        </div>
    )

    return (
        <TwoColumnLayout left={leftContent} right={rightContent} />
    );
}
