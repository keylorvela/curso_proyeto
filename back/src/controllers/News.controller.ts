import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { OStatus } from "../interfaces/OStatus.interface";
import { News } from "interfaces/News.interface";
interface CreateNewsBody {
    title: string;
    content: string;
    groupID: number;
}

export const createNews = async (req: Request, res: Response) => {
    const { title, content, groupID }: CreateNewsBody = req.body;

    if (!title || !content || isNaN(groupID)) {
        res.status(400).send({ error: "All fields are required" });
        return;
    }

    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_News_Create("${title}", "${content}", ${groupID})
        `);

        const resultStatus: OStatus[] = JSON.parse(JSON.stringify(result[0]));
        res.status(200).send(resultStatus[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
};

export const getAllNews = async (req: Request, res: Response) => {
    const { groupID }: { groupID: number } = req.body;

    if (isNaN(groupID) || groupID < 0) {
        res.status(400).send({ error: "Invalid group ID provided" });
        return;
    }

    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_News_ReadAll(${groupID})
        `);
        const newsList: News[] = JSON.parse(JSON.stringify(result[0]));

        res.status(200).send(newsList || []);
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}

export const deleteNews = async (req: Request, res: Response) => {
    const { newsID }: { newsID: number } = req.body;

    if (isNaN(newsID) || newsID < 0) {
        res.status(400).send({ error: "Invalid news ID provided" });
        return;
    }

    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_News_Delete(${newsID})
        `);

        const resultStatus: OStatus[] = JSON.parse(JSON.stringify(result[0]));
        res.status(200).send(resultStatus[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
};

export const updateNews = async (req: Request, res: Response) => {
    const { newsID, title, content }: { newsID: number; title: string; content: string } = req.body;

    if (isNaN(newsID) || newsID < 0 || !title || !content) {
        res.status(400).send({ error: "Invalid input provided" });
        return;
    }

    try {
        const result = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_News_Update(${newsID}, "${title}", "${content}")
        `);

        const resultStatus: OStatus[] = JSON.parse(JSON.stringify(result[0]));
        res.status(200).send(resultStatus[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
};
