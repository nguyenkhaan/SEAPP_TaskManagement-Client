import React from 'react';
import ReactDOM from 'react-dom';
import SmallBlock from '../../components/SmallBlock';

export default function LeftContent()
{
    return (
        <div className='lg:h-full lg:w-full lg:block bg-(--color-primary) px-[50px] text-white'>
            <div class='introduction' className='font-[Montserrat] pt-[72px]'>
                <h1 className='text-[54px] leading-tight font-medium'>Welcome back to <span className='font-bold'>NoTask</span></h1>
                <p className='mt-5 font-[Inter] text-[20px]'>Continue managing your tasks and boosting your productivity.</p>

            </div>
            <div className='grid grid-cols-2 w-[600px] grid-rows-2 mt-[68px] gap-y-6'>
                    <SmallBlock/>
                    <SmallBlock title='500K+' content='Tasks Completed'/>
                    <SmallBlock title='98%' content='Satisfaction'/>
                    <SmallBlock title='4.9/5' content='User Rating'/>
            </div>
        </div>
    );
}
