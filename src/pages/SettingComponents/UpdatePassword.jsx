import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MessageLog from "../../components/MessageLog";
import SectionSetting from "./SectionSettings";
import UserService from "../../services/userServices";
function UpdatePassword() {
    const [loading, setLoading] = useState(false);
    const updatePasswordMutation = useMutation({
        mutationFn: async ({ oldPassword, newPassword }) => {
            const responseData = await UserService.changePassword(
                oldPassword,
                newPassword
            );
            console.log("Log ra tu setting password", responseData);
        },
        onMutate: () => {
            setLoading(true);
            setShowLog(0);
        },
        onSuccess: () => {
            setShowLog(1);
            setLoading(false);
        },
        onError: () => {
            setShowLog(-1);
            setLoading(false);
        },
    });
    const [showLog, setShowLog] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const oldPassword = formData.get("oldPassword");
        const newPassword = formData.get("newPassword");
        console.log(oldPassword, newPassword);
        // if (oldPassword == newPassword)
        //     onSubmit()
        // else onError()
        updatePasswordMutation.mutate({ oldPassword, newPassword });
    };

    const onSubmit = () => {
        updatePasswordMutation();
    };
    const onError = () => {
        setShowLog(-1);
    };
    return (
        <SectionSetting
            header="Change Password"
            description="Enhance your account security by updating your password regularly. Create a strong, new password to protect your data and ensure continued safe access to your account.">
            <>
                <form
                    id="change-password-form"
                    className="w-full grid grid-rows-1 md:grid-cols-2 items-center justify-between gap-y-4 md:gap-x-16"
                    onSubmit={handleSubmit}>
                    <div>
                        <label className="font-md text-lg md:text-xl text-(--color-text)">
                            Old Password
                        </label>
                        <input
                            className="test-sm text-(--color-text) md:text-[18px] h-10 md:h-12 w-full border border-[#757070] bg-(--color-block-item-2) font-md rounded-[10px] py-3 px-3 md:px-5"
                            type="password"
                            onCopy={(e) => {
                                e.preventDefault();
                                return false;
                            }}
                            name="oldPassword"
                        />
                    </div>
                    <div>
                        <label className="font-md text-lg md:text-xl text-(--color-text)">
                            New Password
                        </label>
                        <input
                            className="test-sm text-(--color-text) md:text-[18px] h-10 md:h-12 w-full border border-[#757070] bg-(--color-block-item-2) font-md rounded-[10px] py-3 px-3 md:px-5"
                            type="password"
                            name="newPassword"
                        />
                    </div>
                </form>
                <div className="w-full flex items-center mt-4 justify-end">
                    <motion.button
                        form="change-password-form"
                        type="submit"
                        className="px-4 md:px-7 text-white cursor-pointer font-md bg-(--color-primary) py-3 rounded-xl"
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.20)",
                        }}
                        whileTap={{ scale: 0.92 }}
                        transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 12,
                        }}
                        style={{
                            pointerEvents: loading ? "none" : "auto",
                            opacity: loading ? 0.7 : 1,
                        }}>
                        {loading ? "Saved..." : "Save changes"}
                    </motion.button>
                </div>
            </>
            <MessageLog
                setShowLog={setShowLog}
                showLog={showLog}
                message={
                    showLog == 1
                        ? "Update password thành công"
                        : "Update password thất bại"
                }
            />
        </SectionSetting>
    );
}
export default UpdatePassword;
