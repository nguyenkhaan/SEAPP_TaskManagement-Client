import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Logo from "./Logo";
import { useNavigate } from "react-router";
import AOS from "aos";
import checkLogin from "../services/checkLogin";
import { confirmAlert } from "react-confirm-alert";
import AuthServices from "../services/AuthServices";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Navbar() {
    const isLogin = checkLogin();
    const navigate = useNavigate();
    const QueryClient = useQueryClient();

    const logOutMutation = useMutation({
        mutationFn: async () => {
            if (isLogin) {
                const responseData = await AuthServices.logOut();
                return responseData;
            }
        },
        onSuccess: () => {
            if (isLogin) {
                QueryClient.clear();
                Cookies.remove("user"); // Xóa cookie phía client (nếu không httpOnly)

                setTimeout(() => {
                    navigate("/");
                }, 800);
            }
        },
        onError: () => {},
    });

    const handleLogout = () => {
        confirmAlert({
            message: "Bạn có thực sự muốn đăng xuất không?",
            title: "Đăng xuất",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => logOutMutation.mutate(),
                },
                { label: "No" },
            ],
        });
    };

    return (
        <nav
            data-aos="fade-up"
            className="w-screen left-0 z-99999 fixed bg-(--color-background-2) top-0 shadow-lg h-18 xl:px-[50px] lg:px-10 md:px-[25px] px-2.5 py-8 flex items-center justify-between"
        >
            <Logo />

            <div className="min-h-20 flex lg:text-[22px] md:text-[18px] text-[16px] items-center font-medium text-(--color-text) lg:gap-3 md:gap-2 gap-1">
                
                {/* --- SIGN OUT / SIGN UP --- */}
                {isLogin ? (
                    <motion.button
                        className="lg:px-8 md:px-5 px-3 text-(--color-text) cursor-pointer"
                        initial={{ opacity: 1 }}
                        whileHover={{ color: "#FF6767" }}
                        onClick={handleLogout}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        Sign Out
                    </motion.button>
                ) : (
                    <Link to="/register">
                        <motion.button
                            className="lg:px-8 md:px-5 px-3 text-(--color-text) cursor-pointer"
                            initial={{ opacity: 1 }}
                            whileHover={{ color: "#FF6767" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            Sign Up
                        </motion.button>
                    </Link>
                )}

                {/* --- DASHBOARD / LOGIN --- */}
                <Link to={isLogin ? "/app/dashboard" : "/login"}>
                    <motion.button
                        className="py-1 lg:px-8 md:px-5 px-3 border rounded-xl bg-(--color-background-2) text-(--color-primary) border-(--color-primary) cursor-pointer"
                        initial={{ opacity: 1 }}
                        whileHover={{
                            color: "white",
                            backgroundColor: "#FF6767",
                            borderColor: "Transparent",
                        }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                        {isLogin ? "Dashboard" : "Login"}
                    </motion.button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
