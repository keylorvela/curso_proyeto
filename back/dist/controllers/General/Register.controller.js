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
exports.registerUser = void 0;
const dbConfig_1 = __importDefault(require("../../database/dbConfig"));
const Mail_controller_1 = __importDefault(require("../../mail/Mail.controller"));
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { p_name, p_email, p_phone_number, p_photo, p_username, p_password, p_type } = req.body;
    if (p_name == null || p_email == null || p_phone_number == null || p_username == null || p_password == null || p_type == null) {
        res.status(400).send({ error: "All fieds requiered" });
        return;
    }
    try {
        const mailManager = new Mail_controller_1.default();
        const mailContent = { name: p_name, username: p_username, password: p_password };
        yield mailManager.sendMail_UserRegistration("testELSPrueba@gmail.com", p_email, "Bienvenid@ a ELS", mailContent);
        const result_user = yield dbConfig_1.default.query(`
            CALL SP_General_RegisterUser(
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
//# sourceMappingURL=Register.controller.js.map