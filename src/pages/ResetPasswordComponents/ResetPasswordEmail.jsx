import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import CTA from "../../components/CTA";
import MessageLog from "../../components/MessageLog";
import AuthServices from "../../services/AuthServices";
import ParamServices from "../../services/urlParams";
import Spinner from "../../components/Spinner";
export default function ResetPasswordEmailRightContent() {
    const [isLoading, setLoading] = useState(false);
    const [showLog, setShowLog] = useState(0);
    const formHandleMethod = useForm({
        mode: "onChange",
        criteriaMode: "all",
        reValidateMode: "onBlur",
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = formHandleMethod;
    //Data submit
    const onSubmit = async (data) => {
        const { Email } = data; //Du lieu tra ve
        console.log(Email);
        try {
            setLoading(true) 
            const responseData = await AuthServices.forgotPassword(Email) 
            console.log(responseData)
            setLoading(false) 
            setShowLog(1) 
        } 
        catch (err) {
            setShowLog(-1) 
            console.log(err) 
        }
    };

    return (
        <div className="box-border h-full w-full bg-white relative px-6 md:px-[100px] pt-10 md:pt-[72px]">
            {/* Link to go back */}
            <Link to={"/login"}>
                <span className="absolute top-6 right-8 md:top-10 md:right-10 text-lg md:text-2xl text-(--color-primary) underline font-medium">
                    Go back
                </span>
            </Link>
            {/* introduction */}
            <div className="font-[Montserrat] leading-tight w-full">
                <Logo />
                <p className="text-(--color-text-desc) font-medium">
                    Welcome back! Please fill in your email 
                </p>
            </div>

            {/* input */}
            <form className="mt-10 gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="my-4">
                    <Input
                        title="Email"
                        type="Email"
                        formType="Email"
                        formHandleMethod={formHandleMethod}
                        validation={true}
                    />
                </div>
                <CTA title="Send Email" type="submit" />
            </form>
            <div className="fixed top-1/2 right-1/2">
                <Spinner isLoading={isLoading} />
            </div>
            <MessageLog
                showLog={showLog}
                setShowLog={setShowLog}
                message={
                    (showLog == 1
                        ? "Please check your email!!"
                        : "Oh My God. It's not good")
                }
            />
        </div>
    );
}
