import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import Input from '../../components/Input';
import CTA from '../../components/CTA';
import Logo from '../../components/Logo';
import { Checkbox } from '@mui/material';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
export default function LeftContent() {
    const formHandleMethod = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all'
    })
    const { register, handleSubmit, formState: { errors } } = formHandleMethod
    const [logMessages, setLogMessages] = useState([])
    const checkPolicy = useRef(null)
    const onSubmit = (data) => {
        let chk1 = checkPolicy.current.querySelector('input').checked == false
        let chk2 = data['Password'] != data['Re-Password']
        if (chk1)
            setLogMessages([
                ...logMessages,
                'Vui lòng đồng ý với điều khoản của chúng tôi'
            ])
        if (chk2)
            setLogMessages([
                ...logMessages,
                'Mật khảu nhập lại không khớp'
            ])
        if (!chk1 && !chk2) setLogMessages([]) //Dat lai thanh mang rong khi khong con loi 
    }

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo' , {
                headers: {
                    "Authorization"  : `Bearer ${tokenResponse.access_token}`
                }
            }).then(res => res.data) 

            console.log('Log ra tu trang LeftContent Sign up')
            console.log('Thong tin nguoi dung' , userInfo)
        }
    })
    return (
        <div className='h-full w-full relative bg-white px-6 md:px-[100px] pt-10 md:pt-5'>
            {/* Go back home */}
            <Link to={'/'}>
                <span className="absolute top-6 right-8 md:top-10 md:right-10 text-lg md:text-2xl text-(--color-primary) underline font-medium">Go back</span>
            </Link>

            {/* introduction */}
            <div className="font-[Montserrat] leading-tight w-full">
                <Logo />
                <p className="text-(--color-text-desc) font-medium">
                    Create your account to get started
                </p>
            </div>

            {/* input */}
            <form className="sm:mt-6 md:mt-10 gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Input title="Full Name" formHandleMethod={formHandleMethod} registerName='Name' />
                {/* email */}
                <Input title="Email Address" formType={'Email'} formHandleMethod={formHandleMethod} validation={true} />
                {/* password */}
                <Input title="Password" formType={'Password'} type='password' formHandleMethod={formHandleMethod} validation={true} />
                <Input title="Confirm Password" formType={'Password'} type='password' formHandleMethod={formHandleMethod} validation={false} registerName='Re-Password' />

                <div className="flex items-center text-(--color-primary) font-medium">
                    <Checkbox ref={checkPolicy} />
                    <p className="text-(--color-text)">I agree to <span className='text-(--color-primary)'>Terms of Service</span> and <span className='text-(--color-primary)'>Privacy Policy</span></p>
                </div>
                <CTA title='Create Account' />
            </form>
            <div className='LogMessage w-full flex my-3 flex-col font-medium text-red-600 text-base italic items-center justify-center gap-2'>
                {
                    logMessages.map((logMessage, index) => {
                        return <p className='text-base md:text-lg' key={index}>{logMessage}</p>
                    })
                }
            </div>
            {/* btn */}
            <div className="mt-3">
                <p className="text-(--color-text) mt-2 text-center">Already have an account? <a href="/login" className="text-(--color-primary) font-medium">Sign In</a></p>
                <div className="flex mt-4 items-center">
                    <div className="flex-2 border border-(--color-text-desc) h-px" />
                    <p className="flex-1 text-(--color-text) text-center text-[18px]"> OR </p>
                    <div className="flex-2 border border-(--color-text-desc) h-px" />
                </div>

                <div className="mt-4">
                    <CTA title="Continue with Google" backgroundColor="White" color="#403D3D" border="true" icon="google" action={login} />
                </div>
            </div>
        </div>
    )
}