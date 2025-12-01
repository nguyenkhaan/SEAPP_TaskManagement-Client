import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import api from "../../api/api";
import Input from "../../components/Input";
import CTA from "../../components/CTA";
import Logo from "../../components/Logo";
import { Checkbox } from "@mui/material";
import { loginGoogleSuccess } from "../../services/loginGoogleSuccess";
import { loginGoogleFailed } from "../../services/loginGoogleSuccess";
import Spinner from "../../components/Spinner";
import LoadingHandle from "../../services/loadingHandle";
import MessageLog from "../../components/MessageLog";
import Cookies from "js-cookie";
import checkLogin from "../../services/checkLogin";
export default function RightContent() {
    const formHandleMethod = useForm({
        mode: "onSubmit",
        criteriaMode: "all",
        reValidateMode: "onBlur",
    });

    const [isLoading, setIsLoading] = useState(false); //Bien isLoading
    const [showLog, setShowLog] = useState(0); //Bien dung de nhay messageLog, ban dau ca 2 deu dat la false vi khong co gi de tai
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const {
        handleSubmit,
        formState: { errors },
    } = formHandleMethod;
    //Data submit
    const onSubmit = (data) => {
        if (checkLogin()) {
            alert("Vui lòng đăng xuất trước khi sử dụng dịch vụ");
            return;
        }
        
        const { Email, Password } = data; //Du lieu tra ve

        // setIsLoading(true) 
        api.post("/auth/login", {
            email: Email,
            password: Password,
        }).then((responseData) => {
            setShowLog(1); 
            Cookies.set('user' , responseData.data.token.access_token) 
            setIsLogin(true) //Dat lai da dnag nhap thanh cong de tien hanh chuyen trang 
        })
        .catch((data) => {
          setShowLog(-1); //Dang nhap that bai 
        })

        //Luc nay thi goi ham login binh thuong
    };

    const login = useGoogleLogin({
        //Tao them code de ngan chan nguoi khac login them tai khoan vao
        onSuccess: async (tokenResponse) => {
            if (checkLogin()) {
                alert("Vui lòng đăng xuất trước khi sử dụng lại dịch vụ");
                return;
            }
            setIsLoading(true);
            try {
                setIsLoading(false);
                const responseData = await loginGoogleSuccess(tokenResponse);
                console.log(responseData) //Du lieu gui ve duoc tu dong bien thanh object va nam trong truogn data
                setShowLog(true); //Tien hanh in ra Log message
                Cookies.set("user", responseData.data.token, {
                    secure: true,
                    expires: 7,
                }); //Tien hanh luu JWT token vao trong storage
                // console.log("Da luu token vao trong storage");
                setIsLoading(false);
                setIsLogin(true);
            } catch (error) {
                setShowLog(-1);
                setIsLoading(false); //Bao hieu khong can tai nua
                if (error.response?.status == 400) console.log("Bad Request");
                if (error.response?.status == 401)
                    console.log("Method Not Allowed");
                if (error.response?.status == 403) console.log("Network Error");
            }
        },
        onError: (error) => {
            setShowLog(-1);
            setIsLoading(false);
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
        <div className="box-border h-full w-full bg-white relative px-6 md:px-[100px] pb-10 pt-15 md:pt-[72px]">
            {/* Link to go back */}
            <Link to={"/"}>
                <span className="absolute top-6 right-8 md:top-10 md:right-10 text-lg md:text-xl text-(--color-primary) underline font-medium">
                    Go back
                </span>
            </Link>

            <LoadingHandle
                isLoading={isLoading}
                loadingComponent={
                    <Spinner
                        isLoading={false}
                        position={{ top: "740px", left: "50%" }}
                        height={60}
                    />
                }
                finishComponent={
                    <MessageLog
                        showLog={showLog}
                        setShowLog={setShowLog}
                        message={
                            showLog == -1
                                ? "Đăng nhập thất bại"
                                : "Đăng nhập thành công"
                        }
                    />
                }
            />
            {/* introduction */}
            <div className="font-[Montserrat] leading-tight w-full">
                <Logo />
                <p className="text-(--color-text-desc) font-medium">
                    Welcome back! Please sign in to continue
                </p>
            </div>

            {/* input */}
            <form className="mt-10 gap-4" onSubmit={handleSubmit(onSubmit)}>
                {/* email */}
                <Input
                    title="Email Address"
                    formType="Email"
                    formHandleMethod={formHandleMethod}
                    validation={true}
                />
                {/* password */}
                <div className="my-4">
                    <Input
                        title="Password"
                        type="password"
                        formType="Password"
                        formHandleMethod={formHandleMethod}
                        validation={true}
                    />
                </div>

                <div className="flex items-center text-(--color-primary) font-[Inter] font-medium mb-5">
                    <Checkbox />
                    <p className="text-(--color-text)">Remember me</p>
                    <a className="ml-auto">Forgot password?</a>
                </div>
                <CTA title="Login" type="submit" />
            </form>

            {/* login */}
            <div className="mt-5">
                <p className="text-(--color-text) mt-4 text-center">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-(--color-primary) font-medium">
                        Sign Up
                    </a>
                </p>
                <div className="flex mt-6 items-center">
                    <div className="flex-2 border border-(--color-text-desc) h-px" />
                    <p className="flex-1 text-(--color-text) text-center text-[18px]">
                        {" "}
                        OR{" "}
                    </p>
                    <div className="flex-2 border border-(--color-text-desc) h-px" />
                </div>

                <div className="mt-6">
                    <CTA
                        title="Continue with Google"
                        backgroundColor="White"
                        color="#403D3D"
                        border="true"
                        icon="google"
                        action={() => login()}
                    />
                </div>
            </div>
        </div>
    );
}
