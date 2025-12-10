import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TwoColumnLayout from "../layouts/TwoColumnLayout";
import LeftContent from "./SignUpPageComponents/LeftContent";
import RightContent from "./SignUpPageComponents/RightContent";
import { checkLogin } from "../utils/auth";

export default function SignUpPage() {
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    
    useEffect(() => {
        if (checkLogin()) {
            navigate("/app/dashboard", { replace: true });
        } else {
            setIsReady(true);
        }
    }, []);

    if (!isReady) return null;  // tránh nháy UI trước redirect

    return (
        <TwoColumnLayout
            left={<LeftContent />}
            right={window.innerWidth >= 1280 ? <RightContent /> : null}
        />
    );
}
