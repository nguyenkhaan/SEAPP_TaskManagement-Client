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
            <p className='text-black flex items-center justify-start gap-5 md:gap-12 text-base mt-4'>
                Priority
                <span>
                    <label htmlFor='important' className='mr-2'>Important?</label>
                    <input 
                        type='checkbox' name='important' 
                        {...register("important")}
                        />
                </span>
                <span>
                    <label htmlFor='urgent' className='mr-2'>Urgent?</label>
                    <input 
                        type='checkbox' name='urgent' 
                        {...register("urgent")}
                        />
                </span>
            </p>
        </>
    )
}
export default PriorityChoice