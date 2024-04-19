import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { OStatus } from "../interfaces/OStatus.interface";
import { Student } from "interfaces/Students.interface";


export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Students_ReadAll()
        `);
        const studentsList: Student[] = JSON.parse(JSON.stringify(result[0]));

        res.status(200).send(studentsList || []);
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}

export const getStudentsInGroup = async (req: Request, res: Response) => {
    const { groupID }: { groupID: number } = req.body;

    if (isNaN(groupID) || groupID < 0) {
        res.status(400).send({ error: "Invalid group ID provided" });
        return;
    }

    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Students_ReadAll_inGroup(${groupID})
        `);
        const studentsList: Student[] = JSON.parse(JSON.stringify(result[0]));

        res.status(200).send(studentsList || []);
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}


export const updateStudent = async (req: Request, res: Response) => {
    const { personID, photo, email, phoneNumber, name }: { personID: number; photo: any; email: string; phoneNumber: string; name: string } = req.body;

    if (isNaN(personID) || personID < 0 || !email || !name) {
        res.status(400).send({ error: "Invalid input provided" });
        return;
    }

    try {
        await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Students_Update(${personID}, "${photo}", "${email}", "${phoneNumber}", "${name}")
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
