import React, { useState , useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
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
    mode: 'onSubmit',
    criteriaMode: 'all',
    reValidateMode: "onBlur",
  })

  const [isLoading, setIsLoading] = useState(false)   //Bien isLoading 
  const [showLog , setShowlog] = useState(false)   //Bien dung de nhay messageLog, ban dau ca 2 deu dat la false vi khong co gi de tai
  const { handleSubmit, formState: { errors } } = formHandleMethod
  //Data submit 
  const onSubmit = (data) => {
    const { Email, Password } = data //Du lieu tra ve 
    //Luc nay thi goi ham login binh thuong 
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => loginGoogleSuccess(tokenResponse),
    onError: (error) => loginGoogleFailed(error), 
    flow: "auth-code", 
    scope: "openid email profile", 
  })

  return (
    <div className="box-border h-full w-full bg-white relative px-6 md:px-[100px] pb-10 pt-15 md:pt-[72px]">
      {/* Link to go back */}
      <Link to={'/'}>
        <span className="absolute top-6 right-8 md:top-10 md:right-10 text-lg md:text-xl text-(--color-primary) underline font-medium">Go back</span>
      </Link>


      <LoadingHandle
        isLoading={isLoading}
        loadingComponent={<Spinner isLoading={false} position={{ top: '740px', left: '50%' }} height={60} />}
        finishComponent={<MessageLog showLog={showLog} setShowLog={setShowlog} content="Đăng nhập thành công" />}
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

        <div className="flex items-center text-(--color-primary) font-[Inter] font-medium mb-5">
          <Checkbox />
          <p className="text-(--color-text)">Remember me</p>
          <a className="ml-auto">Forgot password?</a>
        </div>
        <CTA title='Login' type='submit' />
      </form>

      {/* login */}
      <div className="mt-5">

        <p className="text-(--color-text) mt-4 text-center">Don't have an account? <a href="/register" className="text-(--color-primary) font-medium">Sign Up</a></p>
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
