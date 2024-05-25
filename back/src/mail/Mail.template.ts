export const mailTemplate_OTP = (OTP: string, name: string) => {
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
            .p_warning {
                color: #750000;
                font-weight: 600;
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
            <p class="montserrat-text p_content">
                Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte a través del <a href="http://https://wa.me/50661286160" target="_blank" rel="noopener noreferrer">Whatsapp de la Academia</a> o el número de teléfono +506 6128-6160.
            </p>
            <p class="montserrat-text p_content">
                Saludos cordiales.
            </p>
            <p class="montserrat-text p_warning">
                *** Este mensaje fue generado automáticamente. Por favor, no responder este mensaje***
            </p>
        </div>

    </body>
    </html>
    `
}

export const mailTemplate_UserRegistration = (name: string, username: string, password: string) => {
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

        <title>Bienvenido/a a ELS</title>

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
            .p_warning {
                color: #750000;
                font-weight: 600;
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
                                <h1 class="mail_title_h1">Bienvenid@ a ELS!</h1>
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
                Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte a través del <a href="http://https://wa.me/50661286160" target="_blank" rel="noopener noreferrer">Whatsapp de la Academia</a> o el número de teléfono +506 6128-6160.
            </p>
            <p class="montserrat-text p_content">
                Saludos cordiales.
            </p>
            <p class="montserrat-text p_warning">
                *** Este mensaje fue generado automáticamente. Por favor, no responder este mensaje***
            </p>
        </div>

    </body>
    </html>
    `
}

export const mailTemplate_FormVerification = (name: string, phoneNumber: string, email: string, courseName: string, courseSchedule: string) => {
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

        <title>Confirmacion de formulario</title>

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
            .span_formInformation {
                font-size: 1.4rem;
                display: block;
                margin: 30px 0;
                color: #1D2D8C;
            }
            .p_warning {
                color: #750000;
                font-weight: 600;
            }

            /* If the screen size is 600px wide or less */
            @media screen and (max-width: 600px) {
                .mail_title_h1 {
                    margin: 0;
                    font-size: 30px;
                    text-align: center;
                    color: #1D2D8C;
                }
                .span_formInformation {
                    font-size: 1.1rem;
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
                                <h1 class="mail_title_h1">Verificación de Solicitud</h1>
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
                Hemos recibido su formulario de inscripción y estamos emocionados de darle la bienvenida a nuestra comunidad de aprendizaje. Su solicitud está siendo procesada y será revisada por uno de nuestros administradores. Este proceso de verificación es un paso importante para garantizar que todos los participantes cumplan con los requisitos necesarios y para ofrecerle una experiencia educativa de la más alta calidad.
            </p>
            <p class="montserrat-text p_content">
                Hemos recibido su formulario de inscripción y estamos emocionados de darle la bienvenida a nuestra comunidad de aprendizaje. Su solicitud está siendo procesada y será revisada por uno de nuestros administradores. Este proceso de verificación es un paso importante para garantizar que todos los participantes cumplan con los requisitos necesarios y para ofrecerle una experiencia educativa de la más alta calidad.
            </p>
            <p class="montserrat-text p_content">
                A continuación, se presenta la información del formulario enviada:.
            </p>
            <span class="montserrat-text span_formInformation">Nombre: ${name}</span>
            <span class="montserrat-text span_formInformation">Número de teléfono: ${phoneNumber}</span>
            <span class="montserrat-text span_formInformation">Correo electrónico: ${email}</span>
            <span class="montserrat-text span_formInformation">Curso seleccionado: ${courseName}</span>
            <span class="montserrat-text span_formInformation">Horario seleccionado: ${courseSchedule}</span>
            <p class="montserrat-text p_content">
                Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte a través del <a href="http://https://wa.me/50661286160" target="_blank" rel="noopener noreferrer">Whatsapp de la Academia</a> o el número de teléfono +506 6128-6160.
            </p>
            <p class="montserrat-text p_content">
                Saludos cordiales.
            </p>
            <p class="montserrat-text p_warning">
                *** Este mensaje fue generado automáticamente. Por favor, no responder este mensaje***
            </p>
        </div>

    </body>
    </html>
    `
}

export const mailTemplate_ApplicationRejected = (name: string) => {
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

        <title>Estado de la solicitud</title>

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
            .p_warning {
                color: #750000;
                font-weight: 600;
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
                                <h1 class="mail_title_h1">Estado de la solicitud</h1>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </header>
        <hr>
        <div class="content_container">
            <span class="montserrat-text span_greeting">Estimado/a ${name}</span>
            <p class="montserrat-text p_content">
                Hemos detectado un inconveniente con el comprobante de pago proporcionado, y por lo tanto, su solicitud no pudo ser aceptada. En caso de existir algun error, porfavor comunicarse con la academia para darle seguimiento al caso.
            </p>
            <p class="montserrat-text p_content">
                Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte a través del <a href="http://https://wa.me/50661286160" target="_blank" rel="noopener noreferrer">Whatsapp de la Academia</a> o el número de teléfono +506 6128-6160.
            </p>
            <p class="montserrat-text p_warning">
                *** Este mensaje fue generado automáticamente. Por favor, no responder este mensaje***
            </p>
        </div>

    </body>
    </html>
    `
}