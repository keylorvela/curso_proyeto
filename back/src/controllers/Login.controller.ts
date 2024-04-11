import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";

import { StartSession } from "../interfaces/Login.interface"
import { OStatus } from "interfaces/OStatus.interface";

// Login action
export const startSession = async (req: Request, res: Response) => {
    const { p_username, p_password } = req.body;

    try {
        const result = await dbConnection.query<RowDataPacket[]>(`CALL SP_Login_Start_Session("${p_username}", "${p_password}")`);
        const session: StartSession[] = JSON.parse(JSON.stringify(result[0][0]));

        res.status(200).send(session[0] || {});
    } catch (error) {
        res.status(401).send({ error: "Request Failed", info: error });
    }
}
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
    } = req.body;

    if ( p_name == null || p_email == null || p_phone_number == null || p_username == null || p_password == null || p_type == null ) {
        res.status(400).send({ error: "All fieds requiered" });
        return;
    }

    try {
        const result_user = await dbConnection.query<RowDataPacket[]>(`
            CALL SP_Login_Register(
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
// Change user password
export const changePassword = async (req: Request, res: Response) => {
    const { p_userID, p_oldPassword, p_newPassword } = req.body;

    try {
        const result_changePassword = await dbConnection.query<RowDataPacket[]>(`CALL SP_Login_Change_Password(${p_userID}, "${p_oldPassword}", "${p_newPassword}", @o_status)`);
        const result: OStatus[] = JSON.parse(JSON.stringify(result_changePassword[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(401).send({ error: "Request Failed" });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {}