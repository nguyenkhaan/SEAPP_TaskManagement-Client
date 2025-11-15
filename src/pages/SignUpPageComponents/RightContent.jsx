import React from 'react';
import ReactDOM from 'react-dom';
import FeatureTag from '../../components/FeatureTag';

export default function RightContent()
{
    return (
        <div className='w-full h-full bg-(--color-primary) px-[50px] text-white'>
            {/* introduction */}
            <div className='pt-[72px]'>
                <h1 className='text-[54px] font-medium leading-tight font-[Montserrat]'>Start managing your tasks effectively</h1>
                <p className='text-[20px] mt-5'>Join thousands of users who are already boosting their productivity with <span className='font-bold'>NoTask</span>.</p>
            </div>

            {/* features */}
            <div className='mt-12'>
                <FeatureTag />
                <FeatureTag title='Collaborate with your teams' desc='Work together seamlessly' fontawesome='fa-solid fa-people-group' />
                <FeatureTag title='Monitor your progress' desc='Get insights and analytics' fontawesome='fa-solid fa-magnifying-glass' />
                
            </div>
        </div>
    )
}