import nodemailer, { Transporter } from "nodemailer"
import { mailTemplate_FormVerification, mailTemplate_OTP, mailTemplate_UserRegistration, mailTemplate_ApplicationRejected } from "./Mail.template";
import dotenv from "dotenv"
import { FormVerification, OTP_EmailBody, UserRegistration, ApplicationRejected } from "./Main.interface";

dotenv.config();

export default class MailManager {

    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: (process.env.MAIL_PORT_465 == "yes") ? true : false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        })
    }

    public generateOTP() {
        return Math.floor(Math.random() * 9000 + 1000).toString();
    }

    public async testConnection() {
        return new Promise((resolve, reject) => {
            this.transporter.verify((error, success) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(success);
                }
            })
        })
    }

    public async sendMail_OTP(from: string, to: string, subject: string, mailContent: OTP_EmailBody): Promise<void> {
        return new Promise((resolve, reject) => {
            const html = mailTemplate_OTP( mailContent.otp, mailContent.name );

            const mail_config = {
                from,
                to,
                subject,
                html: html
            };

            this.transporter.sendMail(mail_config, (error, info) => {
                if (error) {
                    console.error("Mensaje no enviado!:", error);
                    reject(error);
                }
                else {
                    console.log("Mensaje enviado con exito");
                    resolve();
                }
            });
        })
    }

    public async sendMail_UserRegistration(from: string, to: string, subject: string, mailContent: UserRegistration): Promise<void> {
        return new Promise((resolve, reject) => {
            const html = mailTemplate_UserRegistration(
                mailContent.name,
                mailContent.username,
                mailContent.password
            );

            const mail_config = {
                from,
                to,
                subject,
                html: html
            };

            this.transporter.sendMail(mail_config, (error, info) => {
                if (error) {
                    console.error("Mensaje no enviado!:", error);
                    reject(error);
                }
                else {
                    console.log("Mensaje enviado con exito");
                    resolve();
                }
            });
        })
    }

    public async sendMail_FormVerification(from: string, to: string, subject: string, mailContent: FormVerification): Promise<void> {
        return new Promise((resolve, reject) => {
            const html = mailTemplate_FormVerification(
                mailContent.name,
                mailContent.phoneNumber,
                mailContent.email,
                mailContent.courseName,
                mailContent.courseSchedule
            );

            const mail_config = {
                from,
                to,
                subject,
                html: html
            };

            this.transporter.sendMail(mail_config, (error, info) => {
                if (error) {
                    console.error("Mensaje no enviado!:", error);
                    reject(error);
                }
                else {
                    console.log("Mensaje enviado con exito");
                    resolve();
                }
            });
        })
    }

    public async sendMail_ApplicationRejected(from: string, to: string, subject: string, mailContent: ApplicationRejected): Promise<void> {
        return new Promise((resolve, reject) => {
            const html = mailTemplate_ApplicationRejected(
                mailContent.name
            );

            const mail_config = {
                from,
                to,
                subject,
                html: html
            };

            this.transporter.sendMail(mail_config, (error, info) => {
                if (error) {
                    console.error("Mensaje no enviado!:", error);
                    reject(error);
                }
                else {
                    console.log("Mensaje enviado con exito");
                    resolve();
                }
            });
        })
    }
}