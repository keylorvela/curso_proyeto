import "src/views/auth/OTP_Style.css"

export default function OTP_Request() {
    return (
        <>
            <span className="span_title">Solicitar recuperación de contraseña</span>
            <span className="span_content">Ingrese el correo electrónico asociado a su cuenta.</span>
            <div className="input_container input_vertical">
                <span>Correo electrónico</span>
                <input type="text" className="non_style_input text_field"/>
            </div>
            <button className="button_request">Solicitar</button>
        </>
    );
}