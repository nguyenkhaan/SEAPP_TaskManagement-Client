import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message'
function PriorityChoice({
    formHandle, 
    onPriorityChange
}) {
    const { register, handleSubmit, formState: { errors } } = formHandle; 
    const value = formHandle.watch('createTaskPriority')
    useEffect(() => {
        if (value) 
        {
            onPriorityChange?.(value) //Chay callback va lay du lieu 
        }
    } , [value])
    return (
        <>
            <p className='text-black flex items-center justify-start gap-12 text-base mt-4'>
                Priority
                <span>
                    <label htmlFor='Moderate' className='mr-2'>Moderate</label>
                    <input 
                        type='radio' name='priority' 
                        {...register("createTaskPriority" , {
                            required: "*Chọn thêm độ ưu tiên nhé*"
                        })}
                        value={'low'}
                        
                        />
                </span>
                <span>
                    <label htmlFor='Moderate' className='mr-2'>Moderate</label>
                    <input 
                        type='radio' name='priority' 
                        {...register("createTaskPriority")}
                        value={'medium'}
                        />
                </span>
                <span>
                    <label htmlFor='Moderate' className='mr-2'>Moderate</label>
                    <input 
                        type='radio' name='priority' 
                        {...register("createTaskPriority")}
                        value={'high'}
                        />
                </span>
            </p>
            <ErrorMessage 
                errors={errors} 
                name='createTaskPriority'
                render={({ messages }) => {
                    if (!messages) return null
                    const msgs = ((Array.isArray(messages)) ? messages : Object.values(messages))
                    return msgs.map((msg, index) => <p key={index}  className='text-red-600 mt-2 italic my-1 font-medium text-base'>{msg}</p>)
                }}
            />
        </>
    )
}
export default PriorityChoice