import { Request, Response } from "express";
import dbConnection from "../database/dbConfig";
import { RowDataPacket } from 'mysql2';
import { OStatus } from "interfaces/OStatus.interface";
import { Group, GroupBody, EnrolledCourses, GroupInformation } from "interfaces/Group.interface";

export const listGroupByCourse = async (req: Request, res: Response) => {

    const courseId: number = Number(req.params.courseId);

    // Verificar si courseId es un número válido
    if (isNaN(courseId) || courseId <= 0) {
        res.status(400).send({ error: "Invalid course ID" });
        return;
    }

    try {
        const result_group = await dbConnection.query<RowDataPacket[]>(`CALL SP_Group_ReadAll_ByCourse(${courseId}, @o_status)`);
        const result: Group[] = JSON.parse(JSON.stringify(result_group[0][0]));

        res.status(200).send(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
}

export const getGroupInformation = async (req: Request, res: Response) => {

    const groupId: number = Number(req.params.groupId);

    // Verificar si courseId es un número válido
    if (isNaN(groupId) || groupId <= 0) {
        res.status(400).send({ error: "Invalid group ID" });
        return;
    }

    try {
        const result_group = await dbConnection.query<RowDataPacket[]>(`CALL SP_Group_GetGroupInformation(${groupId}, @o_status)`);
        const result: GroupInformation[] = JSON.parse(JSON.stringify(result_group[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
}

export const createGroup = async (req: Request, res: Response) => {
    const body: GroupBody = req.body;

    // Verificar si los parámetros requeridos están presentes
    if (!body.StartingDate || !body.ScheduleDate || !body.ScheduleHour || !body.Capacity || !body.CourseID) {
        res.status(400).send({ error: "All parameters are requiered" });
        return;
    }

    try {
        const result_group = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Group_Create(
                '${body.StartingDate}',
                '${body.ScheduleDate}',
                '${body.ScheduleHour}',
                ${body.Capacity},
                ${body.CourseID},
                @o_status)`);

            const result: OStatus[] = JSON.parse(JSON.stringify(result_group[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const updateGroup = async (req: Request, res: Response) => {
    const groupId: number = Number(req.params.groupId);
    const body: GroupBody = req.body;

    if (isNaN(groupId) || groupId <= 0) {
        res.status(400).send({ error: "All parameters are requiered" });
        return;
    }

    try {
        const result_group = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Group_Update(
                ${groupId},
                '${body.StartingDate}',
                '${body.ScheduleDate}',
                '${body.ScheduleHour}',
                ${body.Capacity},
                @o_status
            )
        `);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_group[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const listEnrolledGroup = async (req: Request, res: Response) => {
    const userID: number = Number(req.params.userID);

    if (isNaN(userID) || userID <= 0) {
        res.status(400).send({ error: "Invalid user ID" });
        return;
    }

    try {
        const result_group = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Group_ListEnrolled(${userID})
        `);
        const result: EnrolledCourses[] = JSON.parse(JSON.stringify(result_group[0][0]));

        res.status(200).send(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const dropOutGroup = async (req: Request, res: Response) => {
    const { userID, groupID }: { userID: number, groupID: number } = req.body;

    if (!userID || !groupID) {
        res.status(400).send({ error: "Both userID and groupID are required" });
        return;
    }

    try {
        const result_group = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Group_DropOut(${userID}, ${groupID}, @o_status)
        `);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_group[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const deleteGroup = async (req: Request, res: Response) => {
    const groupId: number = Number(req.params.groupId);

    // Verificar si courseId es un número válido
    if (isNaN(groupId) || groupId <= 0) {
        res.status(400).send({ error: "Invalid course ID" });
        return;
    }

    try {
        const result_group = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Group_Delete(${groupId}, @o_status)
        `);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_group[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};