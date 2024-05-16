"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailTemplate_UserRegistration = exports.mailTemplate_OTP = void 0;
const mailTemplate_OTP = (OTP, name) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    
        <title>Cambio de contraseña</title>
    
        <style>
    
            /* Header styles */
            .header_table {
                width: 100%;
                border-collapse: collapse;
                height: 115px;
            }
            #row1-col1 {
                min-width: 130px;
                max-width: 175px;
                /* width: 20%; */
            }
            #row1-col2 {
                width: 100%;
            }
            .montserrat-text {
                font-family: "Montserrat", sans-serif;
                font-optical-sizing: auto;
                font-weight: 400;
                font-style: normal;
            }
            .image_container {
                min-width: 200px;
                max-width: 30%;
            }
            image_container img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .mail_title {
                height: min-content;
                margin-bottom: 20px;
            }
            .mail_title_h1 {
                margin: 0;
                font-size: 3vw;
                text-align: end;
                color: #1D2D8C;
            }

            /* Image style */
            #imageContent {
                width: 100%;
                object-fit: contain;
            }

            /* Divider */
            hr {
                /* border: none; */
                height: 2px;
                border-radius: 6px;
                background: #1D2D8C
            }
            /* Content styles */
            .content_container {
                margin-top: 25px;
            }
            .span_greeting {
                font-weight: 600;
                font-size: 1.5rem;
                color: #1D2D8C;
            }
            .span_code {
                font-size: 2rem;
                display: block;
                margin: 30px 0;
                color: #1D2D8C;
            }

            /* If the screen size is 600px wide or less */
            @media screen and (max-width: 600px) {
                .mail_title_h1 {
                    margin: 0;
                    font-size: 30px;
                    text-align: center;
                    color: #1D2D8C;
                }
                .span_code {
                    font-size: 1.5rem;
                    display: block;
                    margin: 30px 0;
                    color: #1D2D8C;
                }
            }

        </style>
    
    </head>
    <body>
    
        <header class="mail_header">
            <div class="montserrat-text mail_title">
                <table class="header_table">
                    <tbody>
                        <tr>
                            <td id="row1-col1">
                                <img src="https://i.ibb.co/ySHvv1Z/Logo.png" id="imageContent" alt="Logo ELS">
                            </td>
                            <td id="row1-col2">
                                <h1 class="mail_title_h1">¿Olvidó su contraseña?</h1>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </header>
        <hr>
        <div class="content_container">
            <span class="montserrat-text span_greeting">¡Hola ${name}!</span>
            <p class="montserrat-text p_content">
                Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Para completar este proceso, deberás ingresar el siguiente código de un solo uso en el formulario de recuperación.
            </p>
            <span class="montserrat-text span_code">Código: ${OTP}</span>
            <p class="montserrat-text p_content">
                Es importante que no compartas este código con nadie, ya que está diseñado para ser utilizado solo una vez y garantizar la seguridad de tu cuenta. Si no has solicitado esta acción, puedes ignorar este mensaje.
            </p>
        </div>
    
    </body>
    </html>
    `;
};
exports.mailTemplate_OTP = mailTemplate_OTP;
const mailTemplate_UserRegistration = (name, username, password) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    
        <title>Cambio de contraseña</title>
    
        <style>
    
            /* Header styles */
            .header_table {
                width: 100%;
                border-collapse: collapse;
                height: 115px;
            }
            #row1-col1 {
                min-width: 130px;
                max-width: 175px;
                /* width: 20%; */
            }
            #row1-col2 {
                width: 100%;
            }
            .montserrat-text {
                font-family: "Montserrat", sans-serif;
                font-optical-sizing: auto;
                font-weight: 400;
                font-style: normal;
            }
            .image_container {
                min-width: 200px;
                max-width: 30%;
            }
            image_container img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .mail_title {
                height: min-content;
                margin-bottom: 20px;
            }
            .mail_title_h1 {
                margin: 0;
                font-size: 3vw;
                text-align: end;
                color: #1D2D8C;
            }
    
            /* Image style */
            #imageContent {
                width: 100%;
                object-fit: contain;
            }
    
            /* Divider */
            hr {
                /* border: none; */
                height: 2px;
                border-radius: 6px;
                background: #1D2D8C
            }
            /* Content styles */
            .content_container {
                margin-top: 25px;
            }
            .span_greeting {
                font-weight: 600;
                font-size: 1.5rem;
                color: #1D2D8C;
            }
            .span_code {
                font-size: 2rem;
                display: block;
                margin: 30px 0;
                color: #1D2D8C;
            }
    
            /* If the screen size is 600px wide or less */
            @media screen and (max-width: 600px) {
                .mail_title_h1 {
                    margin: 0;
                    font-size: 30px;
                    text-align: center;
                    color: #1D2D8C;
                }
                .span_code {
                    font-size: 1.5rem;
                    display: block;
                    margin: 30px 0;
                    color: #1D2D8C;
                }
            }
    
        </style>
    
    </head>
    <body>
    
        <header class="mail_header">
            <div class="montserrat-text mail_title">
                <table class="header_table">
                    <tbody>
                        <tr>
                            <td id="row1-col1">
                                <img src="https://i.ibb.co/ySHvv1Z/Logo.png" id="imageContent" alt="Logo ELS">
                            </td>
                            <td id="row1-col2">
                                <h1 class="mail_title_h1">Bienvenid@!</h1>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </header>
        <hr>
        <div class="content_container">
            <span class="montserrat-text span_greeting">¡Hola ${name}!</span>
            <p class="montserrat-text p_content">
                Nos complace darte la bienvenida a la academia ELS. Estamos encantados de que te hayas unido a nosotros.
                A continuación, encontrarás tus datos de acceso:
            </p>
            <span class="montserrat-text span_code">Usuario: ${username}</span>
            <span class="montserrat-text span_code">Contraseña: ${password}</span>
            <p class="montserrat-text p_content">
                Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte a través del Whatsapp [Número de teléfono].
            </p>
        </div>
    
    </body>
    </html>
    `;
};
exports.mailTemplate_UserRegistration = mailTemplate_UserRegistration;
//# sourceMappingURL=Mail.template.js.map