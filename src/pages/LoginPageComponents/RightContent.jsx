import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { GoogleLogin } from "@react-oauth/google";  //Button de hien thi ra 
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import axios from "axios";
import Input from "../../components/Input";
import CTA from '../../components/CTA';
import Logo from "../../components/Logo";
import { Checkbox } from "@mui/material";
import { loginGoogleSuccess } from "../../services/loginGoogleSuccess";
import { loginGoogleFailed } from "../../services/loginGoogleSuccess";
import Spinner from "../../components/Spinner";
import LoadingHandle from "../../services/loadingHandle";
import MessageLog from '../../components/MessageLog'
export default function RightContent() {

  const formHandleMethod = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
    reValidateMode: "onBlur",
  })
  const [isLoading, setIsLoading] = useState(false)   //Bien isLoading 
  const { register, handleSubmit, formState: { errors } } = formHandleMethod
  //Data submit 
  const onSubmit = (data) => {
    const { Email, Password } = data //Du lieu tra ve 
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => loginGoogleSuccess(tokenResponse),
    onError: (error) => loginGoogleFailed(error)
  })


  // const onetapLogin = useGoogleOneTapLogin({  //Mo chuc nang dang nhap nhanh 
  //   onSuccess: (credentialResponse) => {
  //     console.log('Thanh cong o one tap login' , credentialResponse)
  //   }
  // })

  return (
    <div className="box-border h-full w-full bg-white relative px-[100px] pt-[72px]">
      {/* Link to go back */}
      <Link to={'/'}>
        <span className="absolute top-10 right-10 text-2xl text-(--color-primary) underline font-medium">Go back</span>
      </Link>


      <LoadingHandle
        isLoading={false}
        loadingComponent={<Spinner isLoading={false} position={{ top: '740px', left: '50%' }} height={60} />}
        finishComponent={<MessageLog showLog={true} content="Đăng nhập thành công" />}
      />
      {/* introduction */}
      <div className="font-[Montserrat] leading-tight w-full">
        <Logo />
        <p className="text-(--color-text-desc) font-medium">
          Welcome back! Please sign in to continue
        </p>
      </div>

      {/* input */}
      <form className="mt-10 gap-4" onSubmit={handleSubmit(onSubmit)} >
        {/* email */}
        <Input title="Email Address" formType='Email' formHandleMethod={formHandleMethod} validation={true} />
        {/* password */}
        <div className="my-4">
          <Input title="Password" type="password" formType='Password' formHandleMethod={formHandleMethod} validation={true} />
        </div>

        <div className="flex items-center text-(--color-primary) font-[Inter] font-medium">
          <Checkbox />
          <p className="text-(--color-text)">Remember me</p>
          <a className="ml-auto">Forgot password?</a>
        </div>
        <CTA title='Login' type='submit' />
      </form>

      {/* login */}
      <div className="mt-5">

        <p className="text-(--color-text) mt-4 text-center">Don't have an account? <a href="/" className="text-(--color-primary) font-medium">Sign Up</a></p>
        <div className="flex mt-6 items-center">
          <div className="flex-2 border border-(--color-text-desc) h-px" />
          <p className="flex-1 text-(--color-text) text-center text-[18px]"> OR </p>
          <div className="flex-2 border border-(--color-text-desc) h-px" />
        </div>

        <div className="mt-6">
          <CTA title="Continue with Google" backgroundColor="White" color="#403D3D" border="true" icon="google" action={() => login()} />
        </div>
      </div>

    </div>
  );
}
