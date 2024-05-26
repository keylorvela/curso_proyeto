import React, { useState } from 'react';
import { ForgetPasswords_States } from '../util/ForgetPasswordStates';

import UserService from '../../services/User.service';

import Loading from '../../components/utils/Loading'

import "src/views/auth/OTP_Style.css"

export default function OTP_Request({ handlerChangePageState }) {
    const [ inputEmail, setInputEmail ] = useState("");
    const [ loading, setLoading ] = useState(false);

    // Update the email input
    const handleEmailInput = (event) => {
        setInputEmail( event.target.value );
    }

    // Send the OTP code
    const handleInputSubmit = async () => {
        setLoading(true);
        await UserService.OTP_RequestCode( inputEmail );
        setLoading(false);

        handlerChangePageState( ForgetPasswords_States.VERIFY_OTP );
    }

    return (
        <>
            {
                loading
                &&
                <div style={{ position: "absolute", top: "0", bottom: "0", left: "0", right: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Loading/>
                </div>
            }

            <span className="span_title">Solicitar recuperación de contraseña</span>
            <span className="span_content">Ingrese el correo electrónico asociado a su cuenta.</span>
            <div className="input_container input_vertical">
                <span>Correo electrónico</span>
                <input
                    type="text"
                    className="non_style_input text_field"
                    value={inputEmail}
                    onChange={handleEmailInput}
                />
            </div>
            <button className="button_request" onClick={ handleInputSubmit }>Solicitar</button>
        </>
    );
}