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
exports.updatePasswordWithOTP = exports.verifyOTP = exports.requestEmail = exports.changePassword = exports.startSession = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const Mail_controller_1 = __importDefault(require("../mail/Mail.controller"));
// Login action
const startSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { p_username, p_password } = req.body;
    try {
        const result = yield dbConfig_1.default.query(`CALL SP_Login_Start_Session("${p_username}", "${p_password}")`);
        const session = JSON.parse(JSON.stringify(result[0][0]));
        res.status(200).send(session[0] || {});
    }
    catch (error) {
        res.status(401).send({ error: "Request Failed", info: error });
    }
});
exports.startSession = startSession;
// Change user password
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { p_userID, p_oldPassword, p_newPassword } = req.body;
    try {
        const result_changePassword = yield dbConfig_1.default.query(`CALL SP_Login_Change_Password(${p_userID}, "${p_oldPassword}", "${p_newPassword}", @o_status)`);
        const result = JSON.parse(JSON.stringify(result_changePassword[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(401).send({ error: "Request Failed" });
    }
});
exports.changePassword = changePassword;
// Send the email password reset
const requestEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const mailManager = new Mail_controller_1.default();
        const otp = mailManager.generateOTP();
        const result_verifyEmail = yield dbConfig_1.default.query(`CALL SP_Login_Verify_Email("${body.requested_email}", ${otp}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_verifyEmail[0][0]));
        if (result[0].IsValid) {
            yield mailManager.sendMail_OTP("testELSPrueba@gmail.com", body.requested_email, "Solicitud de cambio de contraseña", result[0].Name, otp);
            res.status(200).send({ message: "Password reset email sent successfully" });
        }
        else {
            res.status(403).send({ message: "Email does not match" });
        }
    }
    catch (error) {
        res.status(500).send({ error: "Failed to send password reset email", information: error });
    }
});
exports.requestEmail = requestEmail;
// Make the OTP validation
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (isNaN(body.OTP) || body.OTP < 1000 || body.OTP > 9999) {
        res.status(401).send({ error: "OTP not valid" });
        return;
    }
    try {
        const result_validateOTP = yield dbConfig_1.default.query(`CALL SP_Login_Verify_OTP(${body.OTP}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_validateOTP[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(401).send({ error: "Request Failed" });
    }
});
exports.verifyOTP = verifyOTP;
// Update the password
const updatePasswordWithOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (isNaN(body.UserID) || body.UserID <= 0 || isNaN(body.OTP) || body.OTP < 1000 || body.OTP > 9999) {
        res.status(401).send({ error: "OTP not valid" });
        return;
    }
    try {
        const result_passwordReset = yield dbConfig_1.default.query(`CALL SP_Login_ChangeByForget(${body.UserID}, ${body.OTP}, "${body.Password}", @o_status)`);
        const result = JSON.parse(JSON.stringify(result_passwordReset[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(401).send({ error: "Request Failed" });
    }
});
exports.updatePasswordWithOTP = updatePasswordWithOTP;
//# sourceMappingURL=Login.controller.js.map