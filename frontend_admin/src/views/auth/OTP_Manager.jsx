import React, { useState } from 'react';
import "src/views/auth/OTP_Manager.css"

import logo from 'src/assets/Logo ELS.png'

import OTP_Request from "src/views/auth/OTP_Request.jsx";
import OTP_Verify from "src/views/auth/OTP_Verify.jsx";
import OTP_ChangePassword from "src/views/auth/OTP_ChangePassword.jsx";

const StateMode = {
    REQUEST_OTP: "request_otp",
    VERIFY_OTP: "verify_otp",
    CHANGE_PASSWORD: "change_password"
}

export default function OTP_Manager() {

    const [currentState, setCurrentState] = useState( StateMode.VERIFY_OTP )

    function renderComponent() {
        switch (currentState) {
            case StateMode.REQUEST_OTP:
                return <OTP_Request></OTP_Request>
            case StateMode.VERIFY_OTP:
                return <OTP_Verify></OTP_Verify>
            case StateMode.CHANGE_PASSWORD:
                return <OTP_ChangePassword></OTP_ChangePassword>
            default:
                return <></>;
        }
    }

    return (
        <div className="OTP_Card_Container">
            <div className="OTP_Image">
                <img src={logo} alt="Logo ELS"/>
            </div>
            <div className="OTP_Content">
                {renderComponent()}
            </div>
        </div>
    );
}