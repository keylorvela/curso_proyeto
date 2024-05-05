import React, { useState  } from 'react';
import "src/views/auth/OTP_Style.css"

export default function OTP_ChangePassword() {

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordAnimation, setPasswordAnimation] = useState(true);

    function verifyPasswords() {
        setPasswordAnimation( password1 === password2 );
    }

    return (
        <>
            <span className="span_title">Cambio de contraseña</span>
            <div className="input_container input_vertical">
                <span>Ingrese su nueva contraseña</span>
                <input type="text" className={`non_style_input text_field ${passwordAnimation ? '' : 'password_checked'}`} onAnimationEnd={() => setPasswordAnimation(true)} onInput={(e) => {setPassword1(e.target.value)}}/>
                <span>Repita su nueva contraseña</span>
                <input type="text" className={`non_style_input text_field ${passwordAnimation ? '' : 'password_checked'}`} onAnimationEnd={() => setPasswordAnimation(true)} onInput={(e) => {setPassword2(e.target.value)}}/>
            </div>
            <button className="button_request" onClick={verifyPasswords}>Siguiente</button>
        </>
    );
}