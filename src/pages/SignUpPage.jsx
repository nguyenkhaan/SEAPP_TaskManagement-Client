import React from "react";
import ReactDOM from "react-dom";
import TwoColumnLayout from "../layouts/TwoColumnLayout";
import LeftContent from "./SignUpPageComponents/LeftContent";
import RightContent from "./SignUpPageComponents/RightContent";

export default function SignUpPage() {
    const navigate = useNavigate();
    if (checkLogin()) {
        navigate("/app/dashboard");
    }
    let leftContent = <LeftContent />;
    let rightContent = window.innerWidth >= 1280 ? <RightContent /> : false;
    return (
        <>
            <TwoColumnLayout left={leftContent} right={rightContent} />
        </>
    );
}
