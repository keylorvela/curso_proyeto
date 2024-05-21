import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";
import { Categories, CreateCategoryBody } from "interfaces/Categories.interface";
import { OStatus } from "interfaces/OStatus.interface";

export const getTreatmentCategories = async (req: Request, res: Response) => {
    try {
        const result_categories = await dbConnection.query<RowDataPacket[]>(`CALL SP_Categories_GetTreatmentCategories()`);
        const result: Categories[] = JSON.parse(JSON.stringify(result_categories[0][0]));

        res.status(200).send(result);
    } catch (error) {
        res.status(401).send({ error: "Request Failed", info: error });
    }
}

export const createCategory = async (req: Request, res: Response) => {
    const body: CreateCategoryBody = req.body;

    try {
        const result_categories = await dbConnection.query<RowDataPacket[]>(`CALL SP_Categories_Create("${body.CategoryName}", @o_status)`);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_categories[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(401).send({ error: "Request Failed", info: error });
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const categoryID: number | null = Number(req.params.categoryID) || null;

    if (isNaN(categoryID) || categoryID <= 0) {
        res.status(400).send({ error: "Invalid category ID" });
        return;
    }

    try {
        const result_categories = await dbConnection.query<RowDataPacket[]>(`CALL SP_Categories_Delete(${categoryID}, @o_status)`);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_categories[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(401).send({ error: "Request Failed", info: error });
    }
}
