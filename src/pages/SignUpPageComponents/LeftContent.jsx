import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import CTA from '../../components/CTA';
import Logo from '../../components/Logo';
import { Checkbox } from '@mui/material';
export default function LeftContent()
{
    const formHandleMethod = useForm({
        mode: 'onChange', 
        reValidateMode: 'onChange', 
        criteriaMode: 'all'
    })
    const {register , handleSubmit , formState : { errors }} = formHandleMethod 
    const onSubmit = (data) => {
        console.log(data) 
    }
    return (
        <div className='h-full w-full bg-white px-[100px] pt-5'>
            {/* introduction */}
            <div className="font-[Montserrat] leading-tight w-full">
                <Logo/>
                <p className="text-(--color-text-desc) font-medium">
                Create your account to get started
                </p>
            </div>

            {/* input */}
            <form className="mt-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Input title="Full Name" formHandleMethod={formHandleMethod} />
                {/* email */}
                <Input title="Email Address" formType={'Email'} formHandleMethod={formHandleMethod} validation={true} />
                {/* password */}
                <Input title="Password" formType={'Password'} type='password' formHandleMethod={formHandleMethod} validation={true} />
                <Input title="Confirm Password" formType={'Password'} type='password' formHandleMethod={formHandleMethod} validation={false} />

                <div className="flex items-center text-(--color-primary) font-medium">
                    <Checkbox/>
                    <p className="text-(--color-text)">I agree to <span className='text-(--color-primary)'>Terms of Service</span> and <span className='text-(--color-primary)'>Privacy Policy</span></p>
                </div>
                <CTA title='Create Account'/>
            </form>

            {/* btn */}
            <div className="mt-3">
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