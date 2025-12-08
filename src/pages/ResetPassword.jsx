import React from 'react'
import ReactDOM from 'react-dom'
import TwoColumnLayout from '../layouts/TwoColumnLayout'
import LeftContent from './ResetPasswordComponents/LeftContent';
import RightContent from './ResetPasswordComponents/RightContent';
export default function ResetPassword()
{
    let leftContent = window.innerWidth >= 1280 ? <LeftContent/> : false;
    let rightContent = <RightContent/>;
    return (
        <TwoColumnLayout left={leftContent} right={rightContent} />
    );
}
