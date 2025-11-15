import React from 'react'
import ReactDOM from 'react-dom'
import TwoColumnLayout from '../layouts/TwoColumnLayout'
import LeftContent from './LoginPageComponents/LeftContent'
import RightContent from './LoginPageComponents/RightContent'

export default function LoginPage()
{
    const leftContent = <LeftContent/>;
    const rightContent = <RightContent/>;

    return (
        <TwoColumnLayout left={leftContent} right={rightContent} />
    );
}
