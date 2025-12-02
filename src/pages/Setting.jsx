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
import { getUserInfo } from "../services/userServices";
import Loading from "./Loading";
function Setting() {
    const { data, isPending, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const responseData = await getUserInfo();
            return responseData;
        },
    });

    //Mot lat sau phai dowload hinh anh ve va dat thanh default avatar
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    if (isPending) return <Loading />;
    return (
        <WorkingLayout>
            <div className="w-full max-sm:px-2">
                <h2 className="font-md max-md:px-3 text-3xl md:text-4xl">
                    Settings
                </h2>
                <span className="font-md max-md:px-3 block my-2 text-lg md:text-xl">
                    Manage your profile, preferences, and app settings
                </span>
                <div className="flex flex-col shadow-[15px_10px_25px_rgba(0,0,0,0.3)] items-start justify-start w-full bg-white min-h-200 mb-16 overflow-hidden border border-gray-500 rounded-xl mt-6">
                    <SectionSetting>
                        <>
                            <Avatar
                                width={110}
                                height={110}
                                url={data.avatar_url}
                                name={data.name}
                                email={data.email}
                                avatar={avatar}
                                setAvatar={setAvatar}
                                preview={preview}
                                setPreview={setPreview}
                            />
                        </>
                    </SectionSetting>
                    {/* Update thong tin ca nhan  */}
                    <UpdatePersonalInformation avatar={avatar} />
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
