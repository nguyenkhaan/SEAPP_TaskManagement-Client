import React from 'react'
import ReactDOM from 'react-dom'
import TwoColumnLayout from '../layouts/TwoColumnLayout'
import LeftContent from './ResetPasswordComponents/LeftContent';
import ResetPasswordEmailRightContent from './ResetPasswordComponents/ResetPasswordEmail';
export default function ResetPasswordEmailPage()
{
    let leftContent = window.innerWidth >= 1280 ? <LeftContent/> : false;
    let rightContent = <ResetPasswordEmailRightContent/>;
    return (
        <TwoColumnLayout left={leftContent} right={rightContent} />
    );
}
