import React from 'react';
import ReactDOM from 'react-dom';
import TwoColumnLayout from '../layouts/TwoColumnLayout';
import LeftContent from './SignUpPageComponents/LeftContent';
import RightContent from './SignUpPageComponents/RightContent';

export default function SignUpPage() {
    let leftContent = <LeftContent />
    let rightContent = <RightContent />
    if (window.innerWidth <= 1280) rightContent = null 
    return (
        <>
            <TwoColumnLayout left={leftContent} right={rightContent} />
        </>
    )
}
