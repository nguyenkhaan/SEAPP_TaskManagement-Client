//Trang dung de mo duong link verify by Email  
import React from 'react';
import ReactDOM from 'react-dom';
import { useState , useEffect } from 'react';
import RegisterSevices from '../services/register';
function Verify() 
{
    const [status , setStatus] = useState('...Verifying...Gavv Heldenhelm...' ) 
    useEffect(() => {
        const params = new URLSearchParams(window.location.search) 
        const token = params.get('token') 
        if (!token) {
            setStatus('...Missing token') 
            return 
        } 
        RegisterSevices.verify(token).then(data => {
            setStatus('Email has been verified...Charged me...Charged me') 
            setTimeout(() => {
                window.location.href = '/login' //Chuyen ve trang dang nhap 
            } , 1500)
            
        }).catch(() => {
            setStatus('Email verification failed or link is invalid...')
        })
    } , [])
    return (
        <h1>{status}</h1>
    )
} 
export default Verify