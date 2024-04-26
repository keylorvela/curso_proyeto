import { Request, Response } from "express";
import dbConnection from "../database/dbConfig";
import { RowDataPacket } from 'mysql2';
import { Course, CourseBody, CourseID } from "interfaces/Course.interface";
import { OStatus } from "interfaces/OStatus.interface";

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
    const body: CourseBody = req.body;

    // Verificar si los parámetros requeridos están presentes
    if (!body.Name || !body.Description || !body.Duration || !body.Price) {
        res.status(400).send({ error: "At least: Name, Description, Duration, Price requiered" });
        return;
    }

    try {
        const result_course = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Course_Create(
                '${body.Name}',
                '${body.Description}',
                '${body.Topics}',
                '${body.Includes}',
                '${body.Duration}',
                ${body.Price},
                '${body.UserTarget}',
                @o_status)`);

        const result: CourseID[] = JSON.parse(JSON.stringify(result_course[0][0]));

        if (result.length > 0 && result[0].o_courseID != -1) {
            const imagesPromise = body.Photos.map(async (photo) => {
                await dbConnection.query<RowDataPacket[]>(`
                    CALL SP_Image_AddCourseImage(
                        "${photo.url}",
                        ${result[0].o_courseID},
                        "${photo.imageType}",
                        @o_status
                    )
                `);
            });

            await Promise.all(imagesPromise);
        }

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    const courseId: number = Number(req.params.courseId);
    const body: CourseBody = req.body;

    try {
        const result_course = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Course_Update(
                ${courseId},
                '${body.Name}',
                '${body.Description}',
                '${body.Topics}',
                '${body.Includes}',
                '${body.Duration}',
                ${body.Price},
                '${body.UserTarget}',
                @o_status
            )
        `);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_course[0][0]));

        const imagesPromise = body.Photos.map(async (photo) => {
            await dbConnection.query<RowDataPacket[]>(`
                CALL SP_Image_UpdateCourseImage(${photo.imageID}, "${photo.url}", @o_status)
            `);
        })

        await Promise.all(imagesPromise);

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

        const result_images = await dbConnection.query<RowDataPacket[]>(`CALL SP_Image_ReadAllCourse(${courseId}, @o_status)`);
        result[0].Photos = JSON.parse(JSON.stringify(result_images[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
};