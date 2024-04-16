import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { OStatus } from "../interfaces/OStatus.interface";

export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Application_ReadAll()
        `);
        const applicationsList: any[] = JSON.parse(JSON.stringify(result[0]));

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
            CALL SP_Application_Respond(${applicationID}, "${status}", @o_status)
        `);

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}
