import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';

import UserService from '../../services/User.service';

import AlertModal from '../../components/utils/AlertModal'
import Loading from '../../components/utils/Loading'

import "src/views/auth/OTP_Style.css"

export default function OTP_ChangePassword({ verificationResult }) {

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordAnimation, setPasswordAnimation] = useState(true);

    const [ modalMessage, setModalMessage ] = useState("");
    const [ showModal, setShowModal ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const navegate = useNavigate();

    function verifyPasswords() {
        const equal_passwords = password1 === password2;
        setPasswordAnimation( equal_passwords );

        if (equal_passwords) {
            updatePassword();
        }
    }

    async function updatePassword() {
        setLoading(true);
        const { UserID, OTP } = verificationResult

        if (!UserID || !OTP) {
            console.error("Something went wrong with verificationResult", verificationResult);
            setLoading(false);
            return;
        }

        try {
            const result = await UserService.OTP_UpdatePassword(UserID, OTP, password1);

            setLoading(false);
            if (result.o_status.includes("Error")) {
                setModalMessage("Algo salio mal con el cambio de contraseña. Inténtelo nuevamente.");
                setShowModal(true);

                return;
            }

            setModalMessage("Se realizo el cambio de contraseña con éxito. Redirigiendose al inicio de sesión...");
            setShowModal(true);

            setTimeout(() => {
                navegate('/');
            }, 2000)
        } catch (error) {
            setLoading(false);
            console.error("Something went wrong in updatePassword", error);
        }
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