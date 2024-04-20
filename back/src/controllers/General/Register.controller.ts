import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../../database/dbConfig";

import { RegisterBody } from "../../interfaces/General/Register.interface"
import { OStatus } from "interfaces/OStatus.interface";

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    const {
        p_name,
        p_email,
        p_phone_number,
        p_photo,
        p_username,
        p_password,
        p_type
    }: RegisterBody = req.body;

    if ( p_name == null || p_email == null || p_phone_number == null || p_username == null || p_password == null || p_type == null ) {
        res.status(400).send({ error: "All fieds requiered" });
        return;
    }

    try {
        const result_user = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_General_RegisterUser(
                "${p_name}",
                "${p_email}",
                "${p_phone_number}",
                "${(p_photo != "") ? p_photo : null}",
                "${p_username}",
                "${p_password}",
                "${p_type}",
                @o_status)`);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_user[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
}