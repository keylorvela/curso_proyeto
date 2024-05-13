import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../../database/dbConfig";

import { PersonInformation } from "interfaces/General/Person.interface";

// Get user information
export const getUserInformation = async (req: Request, res: Response) => {
    const userID : number | null = Number(req.query.userID) || null;

    if (!userID) {
        res.status(400).send({ error: "User id must be a valid number" });
        return;
    }

    try {
        const resultInformation = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_General_GetUserInformation(${userID}, @o_status)
        `);
        const result: PersonInformation[] = JSON.parse(JSON.stringify(resultInformation[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}