import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { Link } from "react-router";
import Input from "../../components/Input";
import CTA from "../../components/CTA";
import Logo from "../../components/Logo";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import RegisterServices from '../../services/register'
import MessageLog from "../../components/MessageLog";
import checkLogin from "../../services/checkLogin";
import Spinner from "../../components/Spinner";
import useSound from "use-sound";
import { loginGoogleSuccess } from "../../services/loginGoogle";
export default function LeftContent() {
    const soundUrl = 'sound/pop.mp3'
    const [play] = useSound(soundUrl , {
        volume: 0.4 
    })
    const formHandleMethod = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        criteriaMode: "all",
    });
    const navigate = useNavigate();
    const {
        handleSubmit,
        formState: { errors },
    } = formHandleMethod;
    const [registered, setRegistered] = useState(false);
    const [isLogin , setIsLogin] = useState(false) 
    const [logMessages, setLogMessages] = useState([]);
    const checkPolicy = useRef(null);
    const [showLog, setShowLog] = useState(0);
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        if (checkLogin()) {
            alert("Vui lòng đăng xuất trước khi sử dụng dịch vụ này");
            return;
        }
        let chk1 = checkPolicy.current.querySelector("input").checked == false;
        let chk2 = data["Password"] != data["Re-Password"];
        if (chk1)
            setLogMessages([
                ...logMessages,
                "Vui lòng đồng ý với điều khoản của chúng tôi",
            ]);
        if (chk2)
            setLogMessages([...logMessages, "Mật khẩu nhập lại không khớp"]);
        if (!chk1 && !chk2) {
            try {
                setLogMessages([]);
                
                // console.log(data)
                const { Name, Email, Password } = data;
                setLoading(true); // Bat loading
                const responseData = await RegisterServices.registerByEmailPassword(
                    Name,
                    Email,
                    Password
                );
                setLoading(false) 
                // console.log(responseData)
                if (responseData) {
                    setShowLog(1);
                    setRegistered(true) //Dat da dang nap 
                }
            } catch (error) {
                setShowLog(-1);
                setLoading(false);
                if (error.response?.status == 400) console.log("Bad Request");
                if (error.response?.status == 401)
                    console.log("Method Not Allowed");
                if (error.response?.status == 403) console.log("Network Error");
            }
        }
    };

    useEffect(() => {
        if (registered) {
            const timeoutID = setTimeout(() => {
                navigate("/login");
            }, 2000);
            return () => clearTimeout(timeoutID);
        }
    }, [registered]);


    const login = useGoogleLogin({
        //Tao them code de ngan chan nguoi khac login them tai khoan vao
        onSuccess: async (tokenResponse) => {
            if (checkLogin()) {
                alert("Vui lòng đăng xuất trước khi sử dụng lại dịch vụ");
                return;
            }
            setLoading(true);
            try {
                setLoading(true);
                const responseData = await loginGoogleSuccess(tokenResponse);
                // console.log(responseData) //Du lieu gui ve duoc tu dong bien thanh object va nam trong truogn data
                setShowLog(true); //Tien hanh in ra Log message
                Cookies.set("user", responseData.data.token, {
                    secure: true,
                    expires: 7,
                }); //Tien hanh luu JWT token vao trong storage
                // console.log("Da luu token vao trong storage");

                
                setIsLogin(true);
            } catch (error) {
                setShowLog(-1);
                if (error.response?.status == 400) console.log("Bad Request");
                if (error.response?.status == 401)
                    console.log("Unauthorized");
                if (error.response?.status == 403) console.log("Forbidden");
            }
            finally{
                setLoading(false);
            }
        },
        onError: (error) => {
            setShowLog(-1);
            setLoading(false);
        },
        flow: "auth-code",
        scope: "openid email profile",
    });
    useEffect(() => {
        if (isLogin) {
            const timeOutID = setTimeout(() => {
                navigate("/app/dashboard");
            }, 4000); //Chuyen dia diem sau 4000s
            return () => clearTimeout(timeOutID);
        }
    }, [isLogin]);
    return (
        <div className="h-full w-full relative bg-(--color-background-1) px-6 md:px-[100px] pt-10 md:pt-15 pb-10">
            {/* Go back home */}
            <Link to={"/"}>
                <span className="absolute top-6 right-8 md:top-10 md:right-10 text-lg md:text-xl text-(--color-primary) underline font-medium">
                    Go back
                </span>
            </Link>

            {/* introduction */}
            <div className="font-[Montserrat] leading-tight w-full">
                <Logo />
                <p className="text-(--color-text-desc) font-medium">
                    Create your account to get started
                </p>
            </div>

            {/* input */}
            <form
                className="sm:mt-6 md:mt-10 gap-4"
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                    title="Full Name"
                    formHandleMethod={formHandleMethod}
                    registerName="Name"
                />
                {/* email */}
                <Input
                    title="Email Address"
                    formType={"Email"}
                    formHandleMethod={formHandleMethod}
                    validation={true}
                />
                {/* password */}
                <Input
                    title="Password"
                    formType={"Password"}
                    type="password"
                    formHandleMethod={formHandleMethod}
                    validation={true}
                />
                <Input
                    title="Confirm Password"
                    formType={"Password"}
                    type="password"
                    formHandleMethod={formHandleMethod}
                    validation={false}
                    registerName="Re-Password"
                />

                <div className="flex items-center text-(--color-primary) font-medium mb-3">
                    <Checkbox ref={checkPolicy} onChange={play} />
                    <p className="text-(--color-text)">
                        I agree to{" "}
                        <span className="text-(--color-primary)">
                            Terms of Service
                        </span>
                    </p>
                </div>
                <CTA title="Create Account" backgroundColor="var(--color-primary)" />
            </form>
            <div className="LogMessage w-full flex my-3 flex-col font-medium text-red-600 text-base items-center justify-center gap-2">
                {logMessages.map((logMessage, index) => {
                    return (
                        <p className="text-base md:text-lg" key={index}>
                            {logMessage}
                        </p>
                    );
                })}
            </div>
            {/* btn */}
            <div className="mt-3">
                <p className="text-(--color-text) mt-2 text-center">
                    Already have an account?
                    <Link to={'/login'}>
                        <span className="text-(--color-primary) font-medium">
                            Sign In
                        </span>
                    </Link>
                </p>
                <div className="flex mt-4 items-center">
                    <div className="flex-2 border border-(--color-text-desc) h-px" />
                    <p className="flex-1 text-(--color-text) text-center text-[18px]">
                        {" "}
                        OR{" "}
                    </p>
                    <div className="flex-2 border border-(--color-text-desc) h-px" />
                </div>

                <div className="mt-4">
                    <CTA
                        title="Continue with Google"
                        backgroundColor="White"
                        color="#403D3D"
                        border="true"
                        icon="google"
                        action={login}
                    />
                </div>
            </div>
            <div className="inset-0 top-1/2 right-1/2">
                <Spinner isLoading={loading} />
            </div>
            <MessageLog
                showLog={showLog}
                setShowLog={setShowLog}
                message={
                    showLog == 1 ? "Plaease your email !!!" : "Đăng ký thất bại"
                }
            />
        </div>
    );
}
