import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";

import MailManager from "../mail/Mail.controller";

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

export const forgotPassword = async (req: Request, res: Response) => {
    // TODO: Get the necessary information

    try {
        const mailManager = new MailManager();
        await mailManager.sendMail("testELSPrueba@gmail.com", "deynernavarrob@gmail.com", "Prueba Cambio de contraseña");

        res.status(200).send({ message: "Password reset email sent successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to send password reset email" });
    }
}