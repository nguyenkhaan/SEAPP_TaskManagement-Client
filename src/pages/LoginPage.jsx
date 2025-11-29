import React from 'react'
import ReactDOM from 'react-dom'
import TwoColumnLayout from '../layouts/TwoColumnLayout'
import LeftContent from './LoginPageComponents/LeftContent'
import RightContent from './LoginPageComponents/RightContent'

export default function LoginPage()
{
    let leftContent = window.innerWidth >= 1280 ? <LeftContent/> : false;
    let rightContent = <RightContent/>;
    return (
        <TwoColumnLayout left={leftContent} right={rightContent} />
    );
}
