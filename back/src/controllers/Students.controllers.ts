import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { OStatus } from "../interfaces/OStatus.interface";
import { RegStudentInGroup, Student } from "interfaces/Students.interface";


export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Students_ReadAll(@o_status)
        `);
        const studentsList: Student[] = JSON.parse(JSON.stringify(result[0][0]));

        res.status(200).send(studentsList || []);
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}

export const getStudentsInGroup = async (req: Request, res: Response) => {
    const groupID = Number(req.query.groupID) || null;

    if (!groupID || isNaN(groupID) || groupID < 0) {
        res.status(400).send({ error: "Invalid group ID provided" });
        return;
    }

    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Students_ReadAll_inGroup(${groupID}, @o_status)
        `);
        const studentsList: Student[] = JSON.parse(JSON.stringify(result[0][0]));

        res.status(200).send(studentsList || []);
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}


export const updateStudent = async (req: Request, res: Response) => {
    const { personID, photo, email, phoneNumber, name }: { personID: number; photo: string; email: string; phoneNumber: string; name: string } = req.body;

    if (isNaN(personID) || personID < 0 || !email || !name) {
        res.status(400).send({ error: "Invalid input provided" });
        return;
    }

    try {
        const result_Update = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Students_Update(${personID}, "${photo}", "${email}", "${phoneNumber}", "${name}", @o_status)
        `);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_Update[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}

export const registerStudentInGroup = async (req: Request, res: Response) => {
    const body: RegStudentInGroup = req.body;

    if (isNaN(body.UserID) || body.UserID < 0 || isNaN(body.GroupID) || body.GroupID < 0) {
        res.status(400).send({ error: "Invalid IDs provided" });
        return;
    }

    try {
        const result_RegStudent = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Students_AddStudentToGroup(${body.UserID}, ${body.GroupID}, @o_status)
        `);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_RegStudent[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}
