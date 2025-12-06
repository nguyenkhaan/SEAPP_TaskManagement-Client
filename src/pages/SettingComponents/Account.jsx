import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import SectionSetting from "./SectionSettings";
import AuthServices from "../../services/AuthServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { confirmAlert } from "react-confirm-alert";
import { motion } from "framer-motion";
import MessageLog from "../../components/MessageLog";
function Account() {
    const [showLog, setShowLog] = useState(0);
    const navigate = useNavigate();
    const QueryClient = useQueryClient();
    const logOutMutation = useMutation({
        mutationFn: async () => {
            const responseData = await AuthServices.logOut();
            return responseData;
        },
        onSuccess: () => {
            setShowLog(1);
            QueryClient.clear(); //Xoa het tat ca cac cache
            Cookies.remove("user");
            setTimeout(() => {
                navigate("/");
            }, 1200);
        },
        onError: () => {
            setShowLog(-1);
        },
    });

    const handleLogout = () => {
        confirmAlert({
            message: "Bạn có thực sự muốn đăng xuất không?",
            title: "Đăng xuất",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        logOutMutation.mutate();
                    },
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };

    return (
        <>
            <SectionSetting>
                <div className="flex w-full items-center justify-end gap-8">
                    <motion.button
                        onClick={handleLogout}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0px 6px 18px rgba(0,0,0,0.18)",
                            backgroundColor: "rgb(220,220,220)",
                        }}
                        whileTap={{ scale: 0.92 }}
                        className="rounded-xl font-semibold text-lg md:text-xl text-black cursor-pointer px-4 md:px-8 w-[276px] py-3 bg-gray-300">
                        Log out
                    </motion.button>
                </div>
                <MessageLog
                    showLog={showLog}
                    setShowLog={setShowLog}
                    message={
                        showLog == 1
                            ? "Đăng xuất thành công"
                            : "Đăng xuất thất bại"
                    }
                />
            </SectionSetting>
        </>
    );
}
export default Account;

// <button className="rounded-xl font-semibold text-lg md:text-xl cursor-pointer text-(--color-primary) px-2 md:px-8 w-[276px] py-3 text(--color-primary) border border-(--color-primary)">
// Delete Account
// </button>
