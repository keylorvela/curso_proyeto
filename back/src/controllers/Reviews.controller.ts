import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";

import { ResponseBody, Review, TreatmentIDBody, addReviewBody, removeReviewBody } from "../interfaces/Reviews.interface";
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
    const id: number | null = Number( req.body.id ) || null;

    if (isNaN(id) || id <= 0) {
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

export const listReviewsOfTreatment = async (req: Request, res: Response) => {
    const treatment_id: number | null = Number( req.query.treatment_id ) || null;

    if (isNaN(treatment_id) || treatment_id <= 0) {
        res.status(400).send({ error: "Id enter is not valid" });
        return;
    }

    try {
        const result_reviews = await dbConnection.query<RowDataPacket[]>(`CALL SP_Reviews_ReadAll(${treatment_id}, @o_status)`);
        const result: Review[] = JSON.parse(JSON.stringify(result_reviews[0][0]));

        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}

export const addReviewRespond = async (req: Request, res: Response) => {
    const { review_id, respond }: ResponseBody = req.body;

    if (isNaN(review_id) || review_id <= 0 || respond.length <= 0) {
        res.status(400).send({ error: "Input are not valid: Id must be an interger > 0 AND response cannot be empty" });
        return;
    }

    try {
        const result_reviews = await dbConnection.query<RowDataPacket[]>(`CALL SP_Reviews_Respond(${review_id}, "${respond}", @o_status)`);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_reviews[0][0]));

        res.status(200).send(result[0] || {})
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}