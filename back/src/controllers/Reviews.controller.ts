import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";

import { addReviewBody, removeReviewBody } from "../interfaces/Reviews.interface";
import { OStatus } from "interfaces/OStatus.interface";

export const addReview = async (req: Request, res: Response) => {
    const {
        p_name,
        p_reviewContent,
        p_stars,
        p_treatmentID
    }: addReviewBody = req.body;

    if (p_name == "" || p_reviewContent == "" || isNaN(p_treatmentID)) {
        res.status(400).send({ error: "All fieds requiered" });
        return;
    }

    try {
        const result_reviews = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Reviews_Add_Review(
                "${p_name}",
                "${p_reviewContent}",
                ${p_stars},
                ${p_treatmentID},
                @o_status)
        `);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_reviews[0][0]));

        res.status(200).send(result[0] || {})
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
        const result_reviews = await dbConnection.query<RowDataPacket[]>(`CALL SP_Reviews_Remove_Review(${id}, @o_status)`);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_reviews[0][0]));

        res.status(200).send(result[0] || {})
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}