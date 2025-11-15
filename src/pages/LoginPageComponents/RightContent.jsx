import React from "react";
import ReactDOM from "react-dom";
import Input from "../../components/Input";
import CTA from '../../components/CTA';
import { Checkbox } from "@mui/material";

export default function RightContent() {
  return (
    <div className="box-border h-full w-full bg-white px-[100px] pt-[72px]">
        {/* introduction */}
      <div className="font-[Montserrat] leading-tight w-full">
        <h1 className="text-(--color-primary) font-bold text-[44px]">
          NoTask
        </h1>
        <p className="text-(--color-text-desc) font-medium">
          Welcome back! Please sign in to continue
        </p>
      </div>

        {/* input */}
      <div className="mt-10 gap-4">
        {/* email */}
        <Input title="Email Address" />
        {/* password */}
        <div className="mt-4">
          <Input title="Password" />
        </div>

        <div className="flex items-center text-(--color-primary) font-[Inter] font-medium">
            <Checkbox/>
            <p className="text-(--color-text)">Remember me</p>
            <a className="ml-auto">Forgot password?</a>
        </div>
      </div>

      {/* login */}
      <div className="mt-5">
        <CTA title='Login'/>
        <p className="text-(--color-text) mt-4 text-center">Don't have an account? <a href="/" className="text-(--color-primary) font-medium">Sign Up</a></p>
        <div className="flex mt-6 items-center">
            <div className="flex-2 border border-(--color-text-desc) h-px"/>
            <p className="flex-1 text-(--color-text) text-center text-[18px]"> OR </p>
            <div className="flex-2 border border-(--color-text-desc) h-px"/>
        </div>

        <div className="mt-6">
            <CTA title="Continue with Google" backgroundColor="White" color="#403D3D" border="true" icon="google"/>
        </div>
      </div>
    </div>
  );
}
