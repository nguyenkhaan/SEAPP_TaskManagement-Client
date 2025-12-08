import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import WorkingLayout from "../layouts/WorkingLayout";
import { useQuery } from "@tanstack/react-query";
import SectionSetting from "./SettingComponents/SectionSettings";
import Avatar from "../components/Avatar";
import UpdatePersonalInformation from "./SettingComponents/UpdatePersonalInformation";
import UpdatePassword from "./SettingComponents/UpdatePassword";
import Appearance from "./SettingComponents/Appearance";
import Account from "./SettingComponents/Account";
import UserService from "../services/userServices";
import LoadingModal from "./LoadingModal";
function Setting() {
    const { data, isPending, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const responseData = await UserService.getUserInfo();
            return responseData;
        },
        staleTime: 1000 * 5 * 60,    //Rieng theo tung cai instance 
        gcTime: 1000 * 8 * 60   //Tinh theo cai instance cuoi cung 
    });

    //Mot lat sau phai dowload hinh anh ve va dat thanh default avatar
    if (isPending) return <LoadingModal />;
    return (
        <WorkingLayout>
            <div className="w-full max-sm:px-2">
                <h2 className="font-md max-md:px-3 text-3xl md:text-4xl text-(--color-text)">
                    Settings
                </h2>
                <span className="font-md max-md:px-3 block my-2 text-lg md:text-xl text-(--color-text)">
                    Manage your profile, preferences, and app settings
                </span>
                <div className="flex flex-col shadow-[15px_10px_25px_rgba(0,0,0,0.3)] items-start justify-start w-full bg-(--color-background-2) min-h-200 mb-16 overflow-hidden border border-gray-500 rounded-xl mt-6">
                    <SectionSetting header="Avatar" description="Update your avatar to personalize your profile and make your account uniquely yours. Upload a new picture anytime to keep your profile fresh, recognizable, and visually appealing across the platform." >
                        <>
                            <Avatar
                                width={110}
                                height={110}
                     
                            />
                        </>
                    </SectionSetting>
                    {/* Update thong tin ca nhan  */}
                    <UpdatePersonalInformation />
                    {/* Cap nhat lai Mat khau  */}
                    <UpdatePassword />
                    {/* Cap nhat lai theme giao dien  */}
                    <Appearance />
                    {/* quan ly tai khoan  */}
                    <Account />
                </div>
            </div>
        </WorkingLayout>
    );
}
export default Setting;
