import React from 'react'
import ReactDOM from 'react-dom'
import TwoColumnLayout from '../layouts/TwoColumnLayout'
import LeftContent from './LoginPageComponents/LeftContent'
import RightContent from './LoginPageComponents/RightContent'

export default function LoginPage()
{
    let leftContent = <LeftContent/>;
    let rightContent = <RightContent/>;
    if (window.innerWidth <= 1280) leftContent = false 
    return (
        <TwoColumnLayout left={leftContent} right={rightContent} />
    );
}
