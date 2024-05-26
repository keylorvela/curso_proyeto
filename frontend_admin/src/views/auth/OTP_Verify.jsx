import React, { useRef, useState } from 'react';
import { ForgetPasswords_States } from '../util/ForgetPasswordStates';

import UserService from '../../services/User.service';

import AlertModal from '../../components/utils/AlertModal'
import Loading from '../../components/utils/Loading'

import "src/views/auth/OTP_Style.css"

export default function OTP_Verify({ handlerChangePageState, handlerVerificationResult }) {
    // References to all inputs fields
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ]

    const [ modalMessage, setModalMessage ] = useState("");
    const [ showModal, setShowModal ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    // Change to the next input field
    function nextNumberField(index) {
        if (index < inputRefs.length - 1 && inputRefs[ index ].current.value.length === 1) {
            inputRefs[index + 1].current.focus();
        }
    }

    // Submit the enter OTP code
    async function handleOTPSubmit() {
        setLoading(true);
        const OTP_Values = inputRefs.map( ref => ref.current.value ).join("");

        if (OTP_Values.length === 4) {
            const result = await UserService.OTP_VerifyOTP( OTP_Values );

            // Change page if the OTP is valid
            if (result.o_status.includes("Success")) {
                handlerVerificationResult( result );
                handlerChangePageState( ForgetPasswords_States.CHANGE_PASSWORD );
            }
            else {
                setModalMessage("El código ingresado no es válido. Inténtelo nuevamente");
                setShowModal(true);
            }
        }
        setLoading(false);
    }

    return (
        <>
            <AlertModal
                type={"light"}
                title={"Código no válido"}
                message={ modalMessage }
                showAlert={ showModal }
                setShowAlert={ () => { setShowModal(false); } }
            />

            {
                loading
                &&
                <div style={{ position: "absolute", top: "0", bottom: "0", left: "0", right: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Loading/>
                </div>
            }

            <span className="span_content">Se le envío un código de 4 dígitos a su correo electrónico. Por favor, ingreselos en los siguientes espacios.</span>
            <div className="input_container">
                <input type="text" className="non_style_input number_field" maxLength={1} ref={inputRefs[0]} onKeyUp={() => nextNumberField(0)}/>
                <input type="text" className="non_style_input number_field" maxLength={1} ref={inputRefs[1]} onKeyUp={() => nextNumberField(1)}/>
                <input type="text" className="non_style_input number_field" maxLength={1} ref={inputRefs[2]} onKeyUp={() => nextNumberField(2)}/>
                <input type="text" className="non_style_input number_field" maxLength={1} ref={inputRefs[3]} onKeyUp={() => nextNumberField(3)}/>
            </div>
            <button className="button_request" onClick={ handleOTPSubmit }>Siguiente</button>
        </>
    );
}