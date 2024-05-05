import React, { useRef } from 'react';
import "src/views/auth/OTP_Style.css"

export default function OTP_Verify() {
    // References to all inputs fields
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ]

    // Change to the next input field
    function nextNumberField(index) {
        if (index < inputRefs.length - 1 && inputRefs[ index ].current.value.length === 1) {
            inputRefs[index + 1].current.focus();
        }
    }

    return (
        <>
            <span className="span_content">Se le envío un código de 4 dígitos a su correo electrónico. Por favor, ingreselos en los siguientes espacios.</span>
            <div className="input_container">
                <input type="text" className="non_style_input number_field" maxLength={1} ref={inputRefs[0]} onKeyUp={() => nextNumberField(0)}/>
                <input type="text" className="non_style_input number_field" maxLength={1} ref={inputRefs[1]} onKeyUp={() => nextNumberField(1)}/>
                <input type="text" className="non_style_input number_field" maxLength={1} ref={inputRefs[2]} onKeyUp={() => nextNumberField(2)}/>
                <input type="text" className="non_style_input number_field" maxLength={1} ref={inputRefs[3]} onKeyUp={() => nextNumberField(3)}/>
            </div>
            <button className="button_request">Siguiente</button>
        </>
    );
}