import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../../components/Input';
import CTA from '../../components/CTA';
import { Checkbox } from '@mui/material';

export default function LeftContent()
{
    return (
        <div className='h-full w-full bg-white px-[100px] pt-[10px]'>
            {/* introduction */}
            <div className="font-[Montserrat] leading-tight w-full">
                <h1 className="text-(--color-primary) font-bold text-[44px]">
                NoTask
                </h1>
                <p className="text-(--color-text-desc) font-medium">
                Create your account to get started
                </p>
            </div>

            {/* input */}
            <div className="mt-2 gap-4">
                <Input title="Full Name" />
                {/* email */}
                <Input title="Email Address" />
                {/* password */}
                <Input title="Password" />
                <Input title="Confirm Password" />

                <div className="flex items-center text-(--color-primary) font-[Inter] font-medium">
                    <Checkbox/>
                    <p className="text-(--color-text)">I agree to <span className='text-(--color-primary)'>Terms of Service</span> and <span className='text-(--color-primary)'>Privacy Policy</span></p>
                </div>
            </div>

            {/* btn */}
            <div className="mt-3">
                <CTA title='Create Account'/>
                <p className="text-(--color-text) mt-2 text-center">Already have an account? <a href="/" className="text-(--color-primary) font-medium">Sign In</a></p>
                <div className="flex mt-4 items-center">
                    <div className="flex-2 border border-(--color-text-desc) h-px"/>
                    <p className="flex-1 text-(--color-text) text-center text-[18px]"> OR </p>
                    <div className="flex-2 border border-(--color-text-desc) h-px"/>
                </div>
        
                <div className="mt-4">
                    <CTA title="Continue with Google" backgroundColor="White" color="#403D3D" border="true" icon="google"/>
                </div>
            </div>
        </div>
    )
}