import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import dbConnection from "../database/dbConfig";

import MailManager from "../mail/Mail.controller";

import { StartSession, ForgetPasswordBody, OTP_Verification, OTP_Body, OTP_Response, OTP_PasswordResetBody } from "../interfaces/Login.interface"
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

// Send the email password reset
export const requestEmail = async (req: Request, res: Response) => {
    const body: ForgetPasswordBody = req.body;

    try {
        const mailManager = new MailManager();
        const otp = mailManager.generateOTP();

        const result_verifyEmail = await dbConnection.query<RowDataPacket[]>(`CALL SP_Login_Verify_Email("${body.requested_email}", ${otp}, @o_status)`);
        const result: OTP_Verification[] = JSON.parse(JSON.stringify(result_verifyEmail[0][0]));

        if (result[0].IsValid) {
            mailManager.sendMail(
                "testELSPrueba@gmail.com",
                body.requested_email,
                "Solicitud de cambio de contraseña",
                result[0].Name,
                otp
            );
            res.status(200).send({ message: "Password reset email sent successfully" });
        }
        else {
            res.status(403).send({ message: "Email does not match" });
        }
    } catch (error) {
        res.status(500).send({ error: "Failed to send password reset email", information: error });
    }
}

// Make the OTP validation
export const verifyOTP = async (req: Request, res: Response) => {
    const body: OTP_Body = req.body;

    if (isNaN(body.OTP) || body.OTP < 1000 || body.OTP > 9999) {
        res.status(401).send({ error: "OTP not valid" });
        return;
    }

    try {
        const result_validateOTP = await dbConnection.query<RowDataPacket[]>(`CALL SP_Login_Verify_OTP(${body.OTP}, @o_status)`);
        const result: OTP_Response[] = JSON.parse(JSON.stringify(result_validateOTP[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(401).send({ error: "Request Failed" });
    }
}

// Update the password
export const updatePasswordWithOTP = async (req: Request, res: Response) => {
    const body: OTP_PasswordResetBody = req.body;

    if (isNaN(body.UserID) || body.UserID <= 0) {
        res.status(401).send({ error: "OTP not valid" });
        return;
    }

    try {
        const result_passwordReset = await dbConnection.query<RowDataPacket[]>(`CALL SP_Login_ChangeByForget(${body.UserID}, "${body.Password}", @o_status)`);
        const result: OTP_Response[] = JSON.parse(JSON.stringify(result_passwordReset[0][0]));

        res.status(200).send(result[0] || {});
    } catch (error) {
        res.status(401).send({ error: "Request Failed" });
    }
}
