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
import { getUserInfo } from "../../services/userServices";
import Loading from "../Loading";
function UpdatePersonalInformation({ avatar }) {
    const [showLog, setShowLog] = useState(0); //0 dai dien cho false, nen ta set lai thanh false cung se la 0
    const nameRef = useRef(null);
    const birthdayRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    //Ham React Query
    const queryClient = useQueryClient() 
    const { data, isPending, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const responseData = await getUserInfo();
            console.log("Log ra tu setting: ", responseData);
            return responseData;
        },
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

/*

<WorkingModal showModal={showPasswordModal}>
    <div
        className='font-md w-100 h-60 p-6 bg-white rounded-md'
        onClick={(e) => { e.stopPropagation() }}
    >
        <form onSubmit={handleRePasswordClick} >
            <h2 className='font-md text-xl'>Please Enter password again to update your email</h2>
            <label className='text-base text-(--color-text-desc) my-2 block'>Enter your password here: </label>
            <input name='rePassword' type='password' className='w-full rounded-md text-base bg-slate-300 p-2' />
            <div className='mt-5 md:mt-3 w-full flex items-center justify-end gap-2'>
                <button
                    className='bg-gray-300 text-base md:text-lg text-black shadow-lg rounded-md cursor-pointer px-4 py-2'
                    onClick={() => setShowPasswordModal(false)}
                >
                    Canc
                </button>
                <button
                    className='bg-(--color-primary) text-base md:text-lg text-white shadow-lg rounded-md cursor-pointer px-4 py-2'
                >
                    Submit
                </button>
            </di
        </form>
    </div>
</WorkingModal>

    const handleRePasswordClick = (e) => {
        e.preventDefault(); //Ngan khong cho viec submit form lam tai lai trang
        const data = new FormData(e.target);
        const rePassword = data.get("rePassword");
        //Goi ham de xu li xem
        //Neu thanh cong thi goi ham onSubmit
        onSubmit();
        //Neu that bai thi goi ham onError()
        // onError()
    };
    const onSubmit = () => {
        //Dung khi xu li du lieu thanh cong -> Tien hanh cap nhat lai thong tin nguoi dung
        setShowPasswordModal(false);
        setShowLog(1); //Cai nay dai dien cho viec thanh cong, neu la 1 thi no hien thi message bao thanh cong
        updateInfo(); //Thuc hien update lai thogn tin
    };
    const onError = () => {
        //Dung khi xu li that bai -> Hien log bao that bai hoac nguoi dung bam nut Cancel
        setShowLog(-1); //Cai nay dai dien cho viec that bai, neu la -1 thi no se hien thi message bao that bai
    };


*/
