import React from 'react'
import ReactDOM from 'react-dom'
import TwoColumnLayout from '../layouts/TwoColumnLayout'
import LeftContent from './LoginPageComponents/LeftContent'
import RightContent from './LoginPageComponents/RightContent'
import checkLogin from '../services/checkLogin'
import { useNavigate } from 'react-router'
export default function LoginPage()
{
    const navigate = useNavigate() 
    if (checkLogin()) {
        navigate('/app/dashboard')
    }
    let leftContent = window.innerWidth >= 1280 ? <LeftContent/> : false;
    let rightContent = <RightContent/>;
    return (
        <TwoColumnLayout left={leftContent} right={rightContent} />
    );
}
