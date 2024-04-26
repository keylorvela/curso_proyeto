import { Request, Response } from "express"
import dbConnection from "../database/dbConfig";
import { RowDataPacket } from "mysql2";

import { Treatment, TreatmentID, createTreatmentBody, updateTreatmentBody } from "../interfaces/Treatments.interface";
import { OStatus } from "../interfaces/OStatus.interface";

// Create new treatment
export const createTreatment = async (req: Request, res: Response) => {
    const body: createTreatmentBody = req.body;

    try {
        const result_treatment = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Treatment_Create(
                "${body.p_name}",
                "${body.p_description}",
                ${body.p_price},
                "${body.p_includes}",
                "${body.p_procedureDuration}",
                "${body.p_effectDuration}",
                "${body.p_information}",
                ${body.p_categoryID},
                @o_status)`);
        const result: TreatmentID[] = JSON.parse(JSON.stringify(result_treatment[0][0]));

        if (result.length > 0 && result[0].o_treatmentID != -1) {
            const imagesPromise = body.p_photos.map(async (photo) => {
                await dbConnection.query<RowDataPacket[]>(`
                    CALL SP_Image_AddTreatmentImage(
                        "${photo.url}",
                        ${result[0].o_treatmentID},
                        "${photo.imageType}",
                        @o_status
                    )
                `);
            });

            await Promise.all(imagesPromise);
        }

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
};

// Delete specifi treatment
export const deleteTreatment = async (req: Request, res: Response) => {
    const str_treatmentID = req.params.treatmentID;
    const treatmentID: number | null = Number(str_treatmentID) || null;

    // Check if id is a valid input
    if (!treatmentID || treatmentID < 0) {
        res.status(400).send({ error: "Treatment id must be a valid number" });
        return;
    }

    try {
        const result_treatment = await dbConnection.query<RowDataPacket[]>(`CALL SP_Treatment_Delete(${treatmentID}, @o_status)`);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_treatment[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
};

// Get treatment list => CategoryID is optional
export const getTreatmentList = async (req: Request, res: Response) => {
    const categoryID: number | null = Number(req.query.categoryID) || null;
    const limit: number | null = Number(req.query.limit) || 10;
    const offset: number | null = Number(req.query.offset) || 0;

    // Check if limit and offset are valid input
    if (limit === null || offset === null) {
        res.status(400).send({ error: "Limit and/or input must be valid numbers" });
        return;
    }

    try {
        const result_treatment = await dbConnection.query<RowDataPacket[]>(`CALL SP_Treatment_ReadAll(${categoryID}, ${limit}, ${offset}, @o_status)`);
        const result: Treatment[] = JSON.parse(JSON.stringify(result_treatment[0][0]));

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
};

// Get treatment information
export const getTreatmentInformation = async (req: Request, res: Response) => {
    const str_treatmentID = req.params.treatmentID;
    const treatmentID: number | null = Number(str_treatmentID) || null;

    // Check if id is a valid input
    if (!treatmentID || treatmentID < 0) {
        res.status(400).send({ error: "Treatment id must be a valid number" });
        return;
    }

    try {
        const result_treatment = await dbConnection.query<RowDataPacket[]>(`CALL SP_Treatment_SearchFor(${treatmentID}, @o_status)`);
        const result: Treatment[] = JSON.parse(JSON.stringify(result_treatment[0][0]));

        const result_images = await dbConnection.query<RowDataPacket[]>(`CALL SP_Image_ReadAllTreatment(${treatmentID}, @o_status)`);
        result[0].Photos = JSON.parse(JSON.stringify(result_images[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
};

// Update a treatment
export const updateTreatment = async (req: Request, res: Response) => {
    const body: updateTreatmentBody = req.body;

    const treatmentID: number | null = Number(body.p_treatmentID) || null;
    const categoryID: number | null = Number(body.p_categoryID) || null;

    // Check if both id´s are valid input
    if (!treatmentID || !categoryID || treatmentID < 0 || categoryID < 0) {
        res.status(400).send({ error: "Both Ids must be a valid number" });
        return;
    }

    try {
        const result_treatment = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Treatment_Update(
                ${treatmentID},
                "${body.p_name}",
                "${body.p_description}",
                ${body.p_price},
                "${body.p_includes}",
                "${body.p_procedureDuration}",
                "${body.p_effectDuration}",
                "${body.p_information}",
                ${categoryID},
                @o_status)`);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_treatment[0][0]));

        const imagesPromise = body.p_photos.map(async (photo) => {
            await dbConnection.query<RowDataPacket[]>(`
                CALL SP_Image_UpdateTreatmentImage(${photo.imageID}, "${photo.url}", @o_status)`
            );
        });

        await Promise.all(imagesPromise);

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
};


