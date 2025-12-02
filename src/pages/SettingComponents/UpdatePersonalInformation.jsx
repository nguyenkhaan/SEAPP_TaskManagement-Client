import React from "react";
import ReactDOM from "react-dom";
import { useQuery , useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import SectionSetting from "./SectionSettings";
import PersonalInput from "./PersonalInput";
import WorkingModal from "../../components/WorkingModal";
import MessageLog from "../../components/MessageLog";
import BirthdayInput from "./BirthdayInput";
import UserService from "../../services/userServices";
import LoadingModal from "../LoadingModal";
function UpdatePersonalInformation({ avatar }) {
    const [showLog, setShowLog] = useState(0); //0 dai dien cho false, nen ta set lai thanh false cung se la 0
    const nameRef = useRef(null);
    const birthdayRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    //Ham React Query
    const queryClient = useQueryClient() 
    const { data, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const responseData = await UserService.getUserInfo() 
            console.log("Log ra tu setting: ", responseData);
            return responseData;
        },
        staleTime: 1000 * 5 * 60, 
        gcTime: 1000 * 8 * 60 
    });
    const updateInformation = useMutation({
        mutationFn: async (info) => {
            try {
                setShowLog(1) 
            } 
            catch (error) {
                setShowLog(-1) 
            }
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])   //Fetch lai du lieu user => Update lai du lieu 
        }
    })
    const updateInfo = () => {
        const newInfo = {
            name: nameRef.current.value,
            // birthDay: birthdayRef.current.value,
            email: emailRef.current.value,
            phoneNumber: phoneRef.current.value,
        };
        
    };
    const handleInformationClick = () => {
        const newInfo = {
            name: nameRef.current.value, //Khi thu hien nhan nut thi tien hanh thuc hien viec update thong tin
            // birthDay: birthdayRef.current.value,
            // email: emailRef.current.value,
            // phoneNumber: phoneRef.current.value,
            //Thuc hien update thong tin nguoi dung -> Fix lai cai avatar sao cho chuan 
        };

        // updateInfo(); ---> Goi ham react query de tien hanh cap nhat thong tin nguoi dung 
    };
    if (isLoading) return <></>
    return (
        <>
            <SectionSetting>
                <>
                    <form className="w-full grid grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-x-18 gap-y-4 md:gap-y-6">
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
                        <BirthdayInput ref={birthdayRef} />
                        <PersonalInput
                            ref={phoneRef}
                            title="Phone number"
                            value={"09992828283"}
                        />
                    </form>
                    <div className="w-full flex items-center mt-4 justify-end">
                        <button
                            className="px-4 md:px-7 text-white cursor-pointer font-md bg-(--color-primary) py-3 rounded-xl"
                            onClick={handleInformationClick}>
                            Save Changes
                        </button>
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
        </>
    );
}
export default UpdatePersonalInformation;

