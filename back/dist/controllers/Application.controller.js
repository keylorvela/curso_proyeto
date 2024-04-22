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
exports.sendApplication = exports.respondToApplication = exports.getAllApplications = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const getAllApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbConfig_1.default.query(`
            CALL SP_Application_ReadAll()
        `);
        const applicationsList = JSON.parse(JSON.stringify(result[0][0]));
        res.status(200).send(applicationsList || []);
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.getAllApplications = getAllApplications;
const respondToApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { applicationID, status } = req.body;
    if (isNaN(applicationID) || applicationID < 0 || !status) {
        res.status(400).send({ error: "Invalid input provided" });
        return;
    }
    try {
        yield dbConfig_1.default.query(`
            CALL SP_Application_Respond(?, ?, @o_status)
        `, [applicationID, status]);
        const result = yield dbConfig_1.default.query(`
            SELECT @o_status AS o_statusS
        `);
        const resultStatus = JSON.parse(JSON.stringify(result[0]));
        res.status(200).send(resultStatus[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.respondToApplication = respondToApplication;
const sendApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (body.email == "" || body.name == "" || body.payment_receipt == "" || body.phone_number == "" || isNaN(body.groupID) || body.groupID <= 0) {
        res.status(400).send({ error: "All fields are necessary" });
        return;
    }
    try {
        // Use parameterized query to prevent SQL injection
        const result_application = yield dbConfig_1.default.query(`CALL SP_Application_Send(?, ?, ?, ?, ?, @o_status)`, [body.name, body.payment_receipt, body.email, body.phone_number, body.groupID]);
        // Parse the result
        const result = JSON.parse(JSON.stringify(result_application[0][0]));
        // Send the response
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        // Handle errors
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.sendApplication = sendApplication;
//# sourceMappingURL=Application.controller.js.map