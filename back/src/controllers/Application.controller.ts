import { Request, Response } from "express"; 
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { OStatus } from "../interfaces/OStatus.interface";
import { Application, ApplicationBody } from "../interfaces/Application.interface";


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

