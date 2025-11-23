import React from 'react';
import ReactDOM from 'react-dom'
import { useState } from 'react';
import { ErrorMessage } from "@hookform/error-message";
import getFormRule from '../services/formRule';
export default function Input({
    title = 'Default title',
    type = 'text',
    registerName = '', //Ten dung de register cho the Input 
    formHandleMethod = {},
    formType = 'default', //Dua cai formType nay de lay duoc Rule, 
    validation = false,  //Quyet dinh xem co validation hay khong, yeu bang false thi khong, bang true thi co
    placeholder = '',
    isRequired = true
}) {
    const { register, formState: { errors } } = formHandleMethod
    const [showType, setShowType] = useState(type)
    const handleShowPasswordClick = () => {
        if (showType === 'password') {
            setShowType('text')
        }
        else setShowType('password')
    }
    //Xu li logic dieu kien de validation 
    if (!validation) formType = 'default' 

    return (
        <div className='w-full mt-4 relative'>
            <label htmlFor={title} className='font-semibold text-[20px] font-[Montserrat] text-(--color-text) mb-2'>{title}</label>
            <div className='flex items-center relative'>
                <input
                    className='w-full text-(--color-text-desc) h-[45px] text-[18px] rounded-[5px] pr-11 px-3 shadow-[0_4px_10px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_14px_rgba(0,0,0,0.15)] border-[0.5px] border-(--color-text)  outline-none transition-all duration-300'
                    type={showType}
                    onPaste={() => ((type === 'password') ? false : true)}
                    {...register((registerName || formType), {
                        ...getFormRule(formType)  //Thuc hien giai bien required vao ben trong 
                    })}
                    id={title}
                    required={isRequired}
                    placeholder={placeholder}
                />
                <div className={`absolute right-2 ${(formType === 'Password') ? 'block' : 'hidden'} text-black text-[24px]`}>
                    {(showType === 'password' && validation) ? 
                        <i class="fa-solid fa-eye-slash cursor-pointer" onClick={handleShowPasswordClick}></i>
                            :
                        <i class="fa-solid fa-eye cursor-pointer" onClick={handleShowPasswordClick}></i>
                    }
                </div>

            </div>
            <ErrorMessage
                errors={errors}
                name={formType}
                render={({ messages }) => {
                    if (!messages) return null
                    const msgs = ((Array.isArray(messages)) ? messages : Object.values(messages))
                    return msgs.map((msg, index) => <p className='text-red-600 text-[12px] italic my-1 font-medium text-base'>{msg}</p>)
                }}
            />
        </div>
    )
}
