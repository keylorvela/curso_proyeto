import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { OStatus } from "../interfaces/OStatus.interface";
import { Application, ApplicationBody } from "../interfaces/Application.interface";
import fs from 'fs';


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
    const body: ApplicationBody = req.body;

    if (body.email == "" || body.name == "" || body.payment_receipt == "" || body.phone_number == "" || isNaN(body.groupID) || body.groupID <= 0) {
        res.status(400).send({ error: "All fields are necessary" });
        return;
    }

    try {
        // Use parameterized query to prevent SQL injection
        const result_application = await dbConnection.query<RowDataPacket[]>(`CALL SP_Application_Send(?, ?, ?, ?, ?, @o_status)`, [body.name, body.payment_receipt, body.email, body.phone_number, body.groupID]);
        
        // Parse the result
        const result: OStatus[] = JSON.parse(JSON.stringify(result_application[0][0]));

        // Send the response
        res.status(200).send(result[0] || {});
    } catch (error) {
        // Handle errors
        res.status(400).send({ error: "Request Failed", info: error });
    }
}




export const testReceive = async (req: Request, res: Response) => {
    if (!req.file || typeof(req.file) == 'undefined') {
      res.status(400).send('No file uploaded.');
    }
    console.log("in", req.file)
    const {path, buffer} = req.file;
    try {
        // Use parameterized query to prevent SQL injection
        const result_application = await dbConnection.query<RowDataPacket[]>(`CALL SP_Application_Send(?, ?, ?, ?, ?, @o_status)`, ["Test name", fs.readFileSync(path), "email@email.com", 123123, 2]);
        
        // Parse the result
        const result: OStatus[] = JSON.parse(JSON.stringify(result_application[0][0]));

        // Send the response
        res.status(200).send(result[0] || {});
    } catch (error) {
        // Handle errors
        console.log("ERROR")

        console.log(error.message)
        res.status(400).send({ error: "Request Failed", info: error.message });
    }
  };
