import React from "react";
import ReactDOM from "react-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import SectionSetting from "./SectionSettings";
import PersonalInput from "./PersonalInput";
import WorkingModal from "../../components/WorkingModal";
import PasswordConfirmModal from "../../components/PasswordConfirmModal";
import MessageLog from "../../components/MessageLog";
import UserService from "../../services/userServices";
import LoadingModal from "../LoadingModal";

function UpdatePersonalInformation({ avatar }) {
    const [loading , setLoading] = useState(false) 
    const [showLog, setShowLog] = useState(0); //0 dai dien cho false, nen ta set lai thanh false cung se la 0
    const [passwordModal, setPasswordModal] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const nameRef = useRef(null);
    const emailRef = useRef(null);

    //Ham React Query
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const responseData = await UserService.getUserInfo();
            console.log("Log ra tu setting: ", responseData);
            return responseData;
        },
        staleTime: 1000 * 5 * 60,
        gcTime: 1000 * 8 * 60,
    });
    const updateInformation = useMutation({
        mutationFn: async (info) => {
            try {
                const responseData = await UserService.updateUserInfo(info);
                if (responseData) setShowLog(1);
            } catch (error) {
                setShowLog(-1);
            }
        },
        onMutate: () => {
            setLoading(true) 
            setShowLog(0) 
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]); //Fetch lai du lieu user => Update lai du lieu
            setLoading(false) 
        },
    });

    const updateEmailMutation = useMutation({
        mutationFn: async ({ email, password }) => {
            return await UserService.updateEmail({ email, password });
        },
        onMutate: () => {
            setShowLog(0) 
            setLoading(true) 
        }, 
        onSuccess: () => {
            setShowLog(1);
            setPasswordModal(false);
            setLoading(false) 
            queryClient.invalidateQueries(["user"]);
        },
        onError: () => {
            setShowLog(-1);
            setLoading(false) 
        },
    });

    const updateInfo = () => {
        const newInfo = {
            name: nameRef.current.value,
            email: emailRef.current.value,
        };
    };
    const handleInformationClick = () => {
        const emailInput = emailRef.current.value;

        //Nếu đổi email → mở modal nhập password
        if (emailInput !== data.email) {
            setNewEmail(emailInput);
            setPasswordModal(true);
            return;
        }

        //Không đổi email → update bình thường
        updateInformation.mutate({
            name: nameRef.current.value,
        });
    };

    if (isLoading) return <></>;
    return (
        <>
            <SectionSetting>
                <>
                    <form className="w-full grid grid-rows-4 md:grid-cols-2 md:grid-rows-1 gap-x-18 gap-y-4 md:gap-y-6">
                        <PersonalInput
                            ref={nameRef}
                            title="Full Name"
                            value={data.name}
                        />
                        <PersonalInput
                            ref={emailRef}
                            title="Email Address"
                            value={data.email}
                        />
                    </form>
                    <div className="w-full flex items-center mt-4 justify-end">
                        <motion.button
                            onClick={handleInformationClick}
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
                                pointerEvents: (loading? 'none' : 'auto'), 
                                opacity: (loading ? 0.7 : 1)
                            }}
                            
                            >
                            {
                                (loading? 'Saved...': 'Save Changes') 
                            }
                        </motion.button>
                    </div>
                </>
            </SectionSetting>

            {/* Modal de nhap lai Password */}
            <MessageLog
                showLog={showLog}
                setShowLog={setShowLog}
                message={
                    showLog == 1 ? "Cập nhật thành công" : "Cập nhật thất bại"
                }
            />
            <PasswordConfirmModal
                visible={passwordModal}
                onClose={() => setPasswordModal(false)}
                onConfirm={(password) => {
                    updateEmailMutation.mutate({
                        email: newEmail,
                        password,
                    });
                }}
            />
        </>
    );
}
export default UpdatePersonalInformation;
