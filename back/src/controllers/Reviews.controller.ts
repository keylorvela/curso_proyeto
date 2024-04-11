import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";

import { addReviewBody, removeReviewBody } from "../interfaces/Reviews.interface";

export const addReview = async (req: Request, res: Response) => {
    const {
        p_name,
        p_reviewContent,
        p_publishedDate,
        p_stars,
        p_response,
        p_treatmentID
    }: addReviewBody = req.body;

    if (p_name == "" || p_reviewContent == "" || p_publishedDate == "" || p_response == "" || p_treatmentID == "") {
        res.status(400).send({ error: "All fieds requiered" });
        return;
    }

    try {
        const result = await dbConnection.query<RowDataPacket[]>(`SELECT 1`);
        res.status(200).send(result || {})
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}

export const removeReview = async (req: Request, res: Response) => {
    const { id }: removeReviewBody = req.body;

    if (isNaN(id) || id < 0) {
        res.status(400).send({ error: "Id enter is not valid" });
        return;
    }

    try {
        const result = await dbConnection.query<RowDataPacket[]>(`SELECT 1`);
        res.status(200).send(result || {})
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}