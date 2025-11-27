import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useRef, useEffect } from 'react'
import SectionSetting from './SectionSettings'
import PersonalInput from './PersonalInput'
import WorkingModal from '../../components/WorkingModal'
import MessageLog from '../../components/MessageLog'
import BirthdayInput from './BirthdayInput'
function UpdatePersonalInformation() {
    const [personalInformation, setPersonalInformation] = useState({
        name: 'Cloudian',
        birthdDay: '19/01/2006',
        email: 'nguyenkhaan2000@gmail.com',
        phoneNumber: '081817249'
    })
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [showLog, setShowLog] = useState(0) //0 dai dien cho false, nen ta set lai thanh false cung se la 0 
    const nameRef = useRef(null)
    const birthdayRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const updateInfo = () => {
        const newInfo = {
            name: nameRef.current.value,
            // birthDay: birthdayRef.current.value, 
            email: emailRef.current.value,
            phoneNumber: phoneRef.current.value
        }
        setPersonalInformation({
            ...newInfo
        })
    }
    const handleInformationClick = () => {
        const newInfo = {
            name: nameRef.current.value,
            // birthDay: birthdayRef.current.value, 
            email: emailRef.current.value,
            phoneNumber: phoneRef.current.value
        }
        if (newInfo.email != personalInformation.email) {
            setShowPasswordModal(true)
        }
        else updateInfo()
    }
    const handleRePasswordClick = (e) => {
        e.preventDefault() //Ngan khong cho viec submit form lam tai lai trang 
        const data = new FormData(e.target)
        const rePassword = data.get('rePassword')
        //Goi ham de xu li xem 
        //Neu thanh cong thi goi ham onSubmit 
        onSubmit()
        //Neu that bai thi goi ham onError() 
        // onError()  

    }
    const onSubmit = () => {
        //Dung khi xu li du lieu thanh cong -> Tien hanh cap nhat lai thong tin nguoi dung 
        setShowPasswordModal(false)
        setShowLog(1) //Cai nay dai dien cho viec thanh cong, neu la 1 thi no hien thi message bao thanh cong 
        updateInfo() //Thuc hien update lai thogn tin 
    }
    const onError = () => {
        //Dung khi xu li that bai -> Hien log bao that bai hoac nguoi dung bam nut Cancel 
        setShowLog(-1) //Cai nay dai dien cho viec that bai, neu la -1 thi no se hien thi message bao that bai 
    }
    return (
        <>
            <SectionSetting>
                <>
                    <h2 className='font-semibold text-[32px]'>
                        Personal Information
                    </h2>
                    <span className='font-md text-xl mb-4 block'>Manage your information details, including username, birthday, email address, and phone number, to ensure your account is up to date.</span>
                    <form className='w-full grid grid-cols-2 grid-rows-2 gap-x-18 gap-y-6'>
                        <PersonalInput ref={nameRef} title='Full Name' value={personalInformation.name} />
                        <PersonalInput ref={emailRef} title='Email Address' value={personalInformation.email} />
                        <BirthdayInput ref={birthdayRef} />
                        <PersonalInput ref={phoneRef} title='Phone number' value={personalInformation.phoneNumber} />
                    </form>
                    <div className='w-full flex items-center  mt-4 justify-end'>
                        <button className='px-7 text-white cursor-pointer font-md bg-(--color-primary) py-3 rounded-xl' onClick={handleInformationClick}>Save Changes</button>
                    </div>
                </>
            </SectionSetting>

            {/* Modal De nhap nhap lai password */}
            <WorkingModal showModal={showPasswordModal}>
                <div
                    className='font-md w-100 h-60 p-6 bg-white rounded-md'
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <form onSubmit={handleRePasswordClick} >
                        <h2 className='font-md text-xl'>Please Enter password again to update your email</h2>
                        <label className='text-base text-(--color-text-desc) my-2 block'>Enter your password here: </label>
                        <input name='rePassword' type='password' className='w-full rounded-md text-base bg-slate-300 p-2' />
                        <div className='mt-2 w-full flex items-center justify-end gap-2'>
                            <button
                                className='bg-gray-300 text-lg text-black shadow-lg rounded-md cursor-pointer px-4 py-2'
                                onClick={() => setShowPasswordModal(false)}
                            >
                                Cancel

                            </button>
                            <button
                                className='bg-(--color-primary) text-lg text-white shadow-lg rounded-md cursor-pointer px-4 py-2'
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </WorkingModal>
            {/* Modal de nhap lai Password */}
            <MessageLog showLog={showLog} setShowLog={setShowLog} message={(showLog == 1 ? 'Cập nhật thành công' : 'Mật khẩu nhập sai')} />
        </>
    )
}
export default UpdatePersonalInformation