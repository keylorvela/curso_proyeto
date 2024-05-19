import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { OStatus } from "../interfaces/OStatus.interface";
import { Application, ApplicationBody } from "../interfaces/Application.interface";

//File handling
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);







export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Application_ReadAll()
        `);
        const applicationsList: Application[] = JSON.parse(JSON.stringify(result[0][0]));

        
        console.log(applicationsList);

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
        await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Application_Respond(?, ?, @o_status)
        `, [applicationID, status]);

        const result = await dbConnection.query<RowDataPacket[]>(`
            SELECT @o_status AS o_statusS
        `);

        const resultStatus: OStatus[] = JSON.parse(JSON.stringify(result[0]));
        res.status(200).send(resultStatus[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}


export const sendApplication = async (req: Request, res: Response) => {
    
    const { path, buffer } = req.file;


    try {
        // Use parameterized query to prevent SQL injection
        const result_application = await dbConnection.query<RowDataPacket[]>(`CALL SP_Application_Send(?, ?, ?, ?, ?, @o_status)`
        ,[req.body.nombre, fs.readFileSync(path), req.body.correo, req.body.telefono, 2]);

        const result: OStatus[] = JSON.parse(JSON.stringify(result_application[0][0]));


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





