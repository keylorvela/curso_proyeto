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
exports.forgotPassword = exports.changePassword = exports.registerUser = exports.startSession = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
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
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { p_name, p_email, p_phone_number, p_photo, p_username, p_password, p_type } = req.body;
    if (p_name == null || p_email == null || p_phone_number == null || p_username == null || p_password == null || p_type == null) {
        res.status(400).send({ error: "All fieds requiered" });
        return;
    }
    try {
        const result_user = yield dbConfig_1.default.query(`
            CALL SP_Login_Register(
                "${p_name}",
                "${p_email}",
                "${p_phone_number}",
                "${(p_photo != "") ? p_photo : null}",
                "${p_username}",
                "${p_password}",
                "${p_type}",
                @o_status)`);
        const result = JSON.parse(JSON.stringify(result_user[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.registerUser = registerUser;
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
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=Login.controller.js.map