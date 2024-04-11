import { Request, Response } from "express";
import dbConnection from "../database/dbConfig";
import { RowDataPacket } from 'mysql2';
import { Course, EnrolledCourses } from "interfaces/Course.interface";
import { OStatus } from "interfaces/OStatus.interface";

// Comentario
export const getCourseList = async (req: Request, res: Response) => {
    const limit: number = Number(req.query.limit) || 10;
    const offset: number = Number(req.query.offset) || 0;

    if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
        res.status(400).send({ error: "Limit and offset must be valid positive numbers" });
        return;
    }

    try {
        const result_course = await dbConnection.query<RowDataPacket[]>(`CALL SP_Course_ReadAll(${limit}, ${offset}, @o_status)`);
        const result: Course[] = JSON.parse(JSON.stringify(result_course[0][0]));

        res.status(200).send(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const createCourse = async (req: Request, res: Response) => {
    const { startingDate, date, hour, capacity, name, description, price }: {
        startingDate: string,
        date: string,
        hour: string,
        capacity: number,
        name: string,
        description: string,
        price: number
    } = req.body;

    // Verificar si los parámetros requeridos están presentes
    if (!startingDate || !date || !hour || !capacity || !name || !description || !price) {
        res.status(400).send({ error: "All parameters are required" });
        return;
    }

    try {
        const result_course = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Course_Create('${startingDate}','${date}','${hour}',${capacity},'${name}','${description}',${price},@o_status)`);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_course[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    const courseId: number = Number(req.params.courseId);
    const { startingDate, date, hour, capacity, name, description, price }: {
        startingDate: string,
        date: string,
        hour: string,
        capacity: number,
        name: string,
        description: string,
        price: number
    } = req.body;


    if (!startingDate || !date || !hour || !capacity || !name || !description || !price || isNaN(courseId) || courseId <= 0) {
        res.status(400).send({ error: "All parameters are required" });
        return;
    }

    try {
        const result_course = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Course_Update(
                ${courseId},
                '${startingDate}',
                '${date}',
                '${hour}',
                ${capacity},
                '${name}',
                '${description}',
                ${price},
                @o_status
            )
        `);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_course[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    const courseId: number = Number(req.params.courseId);

    // Verificar si courseId es un número válido
    if (isNaN(courseId) || courseId <= 0) {
        res.status(400).send({ error: "Invalid course ID" });
        return;
    }

    try {
        const result_course = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Course_Delete(${courseId}, @o_status)
        `);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_course[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const dropOutCourse = async (req: Request, res: Response) => {
    const { userID, groupID }: { userID: number, groupID: number } = req.body;


    if (!userID || !groupID) {
        res.status(400).send({ error: "Both userID and groupID are required" });
        return;
    }

    try {
        const result_course = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Course_DropOut(${userID}, ${groupID}, @o_status)
        `);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_course[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const listEnrolledCourses = async (req: Request, res: Response) => {
    const userID: number = Number(req.params.userID);

    if (isNaN(userID) || userID <= 0) {
        res.status(400).send({ error: "Invalid user ID" });
        return;
    }

    try {
        const result_course = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Course_ListEnrolled(${userID})
        `);
        const result: EnrolledCourses[] = JSON.parse(JSON.stringify(result_course[0][0]));

        res.status(200).send(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const searchCourse = async (req: Request, res: Response) => {
    const courseId: number = Number(req.params.courseId);

    // Verificar si courseId es un número válido
    if (isNaN(courseId) || courseId <= 0) {
        res.status(400).send({ error: "Invalid course ID" });
        return;
    }

    try {
        const result_course = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Course_SearchFor(${courseId}, @o_status)
        `);
        const result: Course[] = JSON.parse(JSON.stringify(result_course[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};