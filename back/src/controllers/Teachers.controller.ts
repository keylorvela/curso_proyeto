import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { OStatus } from "../interfaces/OStatus.interface";
import { Professor } from "interfaces/Professor.interface";

export const getAllProfessors = async (req: Request, res: Response) => {
    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Professors_ReadAll(@o_status)
        `);
        const professorsList: Professor[] = JSON.parse(JSON.stringify(result[0]));

        res.status(200).send(professorsList || []);
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}


export const updateProfessor = async (req: Request, res: Response) => {
    const { personID, photo, email, phoneNumber, name }: { personID: number; photo: any; email: string; phoneNumber: string; name: string } = req.body;

    if (isNaN(personID) || personID < 0 || !email || !name) {
        res.status(400).send({ error: "Invalid input provided" });
        return;
    }

    try {
        await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Professors_Update(${personID}, "${photo}", "${email}", "${phoneNumber}", "${name}", @o_status)
        `);

        const result = await dbConnection.query<RowDataPacket[]>(`
            SELECT @o_status AS o_status
        `);

        const resultStatus: OStatus[] = JSON.parse(JSON.stringify(result[0]));
        const professorInfo = result[0][0];

        res.status(200).send(professorInfo || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}


export const deleteProfessor = async (req: Request, res: Response) => {
    const { userID }: { userID: number } = req.body;

    if (isNaN(userID) || userID < 0) {
        res.status(400).send({ error: "Invalid user ID provided" });
        return;
    }

    try {
        await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Professors_Delete(${userID}, @o_status)
        `);

        const result = await dbConnection.query<RowDataPacket[]>(`
            SELECT @o_status AS o_status
        `);

        const resultStatus: OStatus[] = JSON.parse(JSON.stringify(result[0]));
        res.status(200).send(resultStatus[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}
