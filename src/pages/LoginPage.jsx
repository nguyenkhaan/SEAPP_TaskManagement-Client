import React, { useEffect, useState } from 'react';
import TwoColumnLayout from '../layouts/TwoColumnLayout';
import LeftContent from './LoginPageComponents/LeftContent';
import RightContent from './LoginPageComponents/RightContent';
import checkLogin from '../services/checkLogin';
import { useNavigate } from 'react-router';

export default function LoginPage() {
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (checkLogin()) {
            navigate('/app/dashboard', { replace: true });
        } else {
            setIsReady(true);
        }
    }, []);

    if (!isReady) return null; // tránh render UI khi đang redirect

    let leftContent = window.innerWidth >= 1280 ? <LeftContent /> : null;
    let rightContent = <RightContent />;

    return <TwoColumnLayout left={leftContent} right={rightContent} />;
}
