import React, { useState } from 'react';
import "src/views/auth/OTP_Manager.css"

import logo from 'src/assets/Logo ELS.png'

import OTP_Request from "src/views/auth/OTP_Request.jsx";
import OTP_Verify from "src/views/auth/OTP_Verify.jsx";
import OTP_ChangePassword from "src/views/auth/OTP_ChangePassword.jsx";

import { ForgetPasswords_States } from '../util/ForgetPasswordStates';

export default function OTP_Manager() {
    const [currentState, setCurrentState] = useState( ForgetPasswords_States.REQUEST_OTP );
    const [verificationResult, setVerificationResult] = useState( null );

    function changeCurrentState(page_state) {
        setCurrentState(page_state);
    }

    function handleVerificationResult(result) {
        setVerificationResult( result );
    }

    function renderComponent() {
        switch (currentState) {
            case ForgetPasswords_States.REQUEST_OTP:
                return <OTP_Request
                    handlerChangePageState={ changeCurrentState }
                />
            case ForgetPasswords_States.VERIFY_OTP:
                return <OTP_Verify
                    handlerChangePageState={ changeCurrentState }
                    handlerVerificationResult={ handleVerificationResult }
                />
            case ForgetPasswords_States.CHANGE_PASSWORD:
                return <OTP_ChangePassword
                    verificationResult={ verificationResult }
                />
            default:
                return <></>;
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="OTP_Card_Container">
                <div className="OTP_Image">
                    <img src={logo} alt="Logo ELS"/>
                </div>
                <div className="OTP_Content">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}