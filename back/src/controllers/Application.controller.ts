import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { OStatus } from "../interfaces/OStatus.interface";
import { ApplicantInformation, Application, ApplicationBody, ApplicationResponse } from "../interfaces/Application.interface";
import { generateRandomPassword } from "../utilities/PasswordGenerator";

//File handling
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import MailManager from "../mail/Mail.controller";
import { ApplicationRejected, FormVerification } from "mail/Main.interface";
import { UserRegistration } from '../mail/Main.interface';
const unlinkAsync = promisify(fs.unlink);


export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Application_ReadAll()
        `);
        const applicationsList: Application[] = JSON.parse(JSON.stringify(result[0][0]));


        res.status(200).send(applicationsList || []);
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}

export const respondToApplication = async (req: Request, res: Response) => {
    const { applicationID, status }: { applicationID: number; status: string } = req.body;

    if (isNaN(applicationID) || applicationID < 0 || !status) {
        res.status(400).send({ error: "Invalid input provided" });
        return;
    }

    try {
        const mailManager = new MailManager();
        const tempPassword = generateRandomPassword();

        const result_application = await dbConnection.query<RowDataPacket[]>(`
        CALL SP_Application_Respond(?, ?, ?, @o_status)
        `, [applicationID, status, tempPassword]);

        console.log(result_application[0]);

        const result: ApplicantInformation[] = JSON.parse(JSON.stringify(result_application[0][2]));
        const result_registration: OStatus[] = JSON.parse(JSON.stringify(result_application[0][0]));

        // Send email if user was accepted
        if (result[0].o_status.includes("Success")) {

            // If user is already registered := Do not send email
            if (result_registration[0].o_status.includes("Success")) {
                const mailContent: UserRegistration = {
                    name: result[0].ApplicantName,
                    username: result[0].ApplicantEmail,
                    password: tempPassword
                }

                await mailManager.sendMail_UserRegistration(
                    "testELSPrueba@gmail.com",
                    result[0].ApplicantEmail,
                    "Bienvenid@ a ELS",
                    mailContent
                );
            }
        }
        // Send mail if user was rejected
        else if (result[0].o_status.includes("Info")) {
            const mailContent: ApplicationRejected = {
                name: result[0].ApplicantName
            }

            await mailManager.sendMail_ApplicationRejected(
                "testELSPrueba@gmail.com",
                result[0].ApplicantEmail,
                "Estado de la solicitud",
                mailContent
            )
        }

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}


export const sendApplication = async (req: Request, res: Response) => {

    const { path, buffer } = req.file;

    const mailManager = new MailManager();
    const mailContent: FormVerification = { name: "", phoneNumber: "", email: "", courseName: "", courseSchedule: "" }

    try {
        // Use parameterized query to prevent SQL injection
        const result_application = await dbConnection.query<RowDataPacket[]>(`CALL SP_Application_Send(?, ?, ?, ?, ?, @o_status)`
            , [req.body.nombre, fs.readFileSync(path), req.body.correo, req.body.telefono, req.body.groupId]);


        console.log(result_application[0]);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_application[0][0]));

        //TODO Fix schedules
        const content: FormVerification = {
            name: req.body.nombre,
            phoneNumber : req.body.telefono,
            email: req.body.correo,
            courseName: req.body.curso,
            courseSchedule: req.body.idCurso};
        if (result) {
            await mailManager.sendMail_FormVerification(
                "testELSPrueba@gmail.com",
                req.body.correo,
                "Verificacion de formulario",
                content
            )
        }

        //Delete file
        const resultDelete = await unlinkAsync(path);
        // Send the response
        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error.message });
    }
}





export const getApplicationFile = async (req: Request, res: Response) => {
    const { idApplication } = req.params;



    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_GetPaymentReceiptByID(?)
        `, [idApplication]);



        // Verifica que haya un resultado válido y que contenga el campo PaymentReceipt
        if (result[0][0][0]["PaymentReceipt"]) {
            const paymentReceipt: Buffer = result[0][0][0]["PaymentReceipt"];

            // Configura los encabezados de la respuesta para forzar la descarga del archivo
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=payment_receipt_${idApplication}.pdf`);
            res.send(paymentReceipt);
        } else {
            return res.status(404).send('Payment receipt not found.');
        }
    } catch (error) {
        res.status(500).send({ error: 'Request Failed', info: error.message });
    }
}





