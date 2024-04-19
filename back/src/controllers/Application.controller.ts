import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { OStatus } from "../interfaces/OStatus.interface";
import { Application } from "interfaces/Application.interface";


export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Application_ReadAll()
        `);
        const applicationsList: Application[] = JSON.parse(JSON.stringify(result[0]));

        res.status(200).send(applicationsList || []);
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}




export const deleteTreatment = async(req: Request, res: Response) => {
    const str_treatmentID = req.params.treatmentID;
    const treatmentID: number | null = Number(str_treatmentID) || null;

    // Check if id is a valid input
    if (!treatmentID || treatmentID < 0) {
        res.status(400).send({ error: "Treatment id must be a valid number" });
        return;
    }

    try {
        const result_treatment = await dbConnection.query<RowDataPacket[]>(`CALL SP_Treatment_Delete(${treatmentID}, @o_status)`);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_treatment[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
};

