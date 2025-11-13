import React from 'react'
import ReactDOM from 'react-dom'
import TwoColumnLayout from '../layouts/TwoColumnLayout'

export default function LoginPage()
{
    const leftContent = (
        <div className='h-full w-full bg-[#FF6767] pl-[50] text-white'>
            <h1>Welcome back to NoTask</h1>
            <p>Continue managing your tasks and boosting your productivity.</p>
        </div>
    )

    const rightContent = (
        <div className='h-full w-full bg-white pr-[50]'>
            <h1 className='text-[#FF6767] font-[Montserrat]'>NoTask</h1>
        </div>
    )

    return (
        <TwoColumnLayout left={leftContent} right={rightContent} />
    );
}
