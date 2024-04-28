import nodemailer, { Transporter } from "nodemailer"
import mailTemplateGenerator from "./Mail.template";
import dotenv from "dotenv"

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

    public async sendMail(from: string, to: string, subject: string, name: string, otp: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const html = mailTemplateGenerator( otp, name );

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