import React from 'react';
import ReactDOM from 'react-dom';

import TwoColumnLayout from '../layouts/TwoColumnLayout';
import LeftContent from './SignUpPageComponents/LeftContent';
import RightContent from './SignUpPageComponents/RightContent';

export default function SignUpPage()
{
    const leftContent = <LeftContent/>
    const rightContent = <RightContent/>
    return (
        <TwoColumnLayout left={leftContent} right={rightContent}  />
    )
}
