"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const Mail_template_1 = __importDefault(require("./Mail.template"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MailManager {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: (process.env.MAIL_PORT_465 == "yes") ? true : false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }
    generateOTP() {
        return Math.floor(Math.random() * 9000 + 1000).toString();
    }
    testConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.transporter.verify((error, success) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(success);
                    }
                });
            });
        });
    }
    sendMail(from, to, subject, name, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const html = (0, Mail_template_1.default)(otp, name);
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
            });
        });
    }
}
exports.default = MailManager;
//# sourceMappingURL=Mail.controller.js.map