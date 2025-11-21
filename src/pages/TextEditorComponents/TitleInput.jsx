import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message';
function TitleInput({
    formHandle, 
    onTitleChange //Dung de theo doi su thay doi cua title 
})
{
    const { register, handleSubmit, formState: { errors } } = formHandle; 
    const value = formHandle.watch("createTaskTitleInput")  //Theo doi su thay doi cua the input 
    useEffect(() => {
        if (value) onTitleChange(value) 
    } , [value])
    return (
        <>
            <input 
                className='font-semibold text-2xl w-full line-clamp-2 text-black px-3 py-2 rounded-md border-2 border-slate-300' 
                {...register("createTaskTitleInput" , {
                    required: "*Không được bỏ trống tiêu đề bạn ơi*"
                })}
            />
            <ErrorMessage 
                errors={errors}
                name='createTaskTitleInput'
                render={({ messages }) => {
                    if (!messages) return null
                    const msgs = ((Array.isArray(messages)) ? messages : Object.values(messages))
                    return msgs.map((msg, index) => <p key={index}  className='text-red-600 italic my-1 font-medium text-base'>{msg}</p>)
                }}
            />
        </>
    )
}
export default TitleInput