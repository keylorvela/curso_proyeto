"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailTemplateGenerator = (OTP, name) => {
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
                <h1 class="mail_title_h1">¿Olvidó su contraseña?</h1>
            </div>
        </header>
        <hr>
        <div class="content_container">
            <span class="montserrat-text span_greeting">¡Hola ${name}!</span>
            <p class="montserrat-text p_content">
                Recibimos una petición de olvido su contraseña. Si es así, utiliza este !!METODO!!
            </p>
            <span class="montserrat-text span_code">Código: ${OTP}</span>
            <p class="montserrat-text p_content">
                Si no solicitastes este cambio, puedes ignorar este mensaje.
            </p>
        </div>
    
    </body>
    </html>
    `;
};
exports.default = mailTemplateGenerator;
//# sourceMappingURL=Mail.template.js.map