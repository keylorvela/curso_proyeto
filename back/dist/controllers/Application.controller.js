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
exports.getApplicationFile = exports.sendApplication = exports.respondToApplication = exports.getAllApplications = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const PasswordGenerator_1 = require("../utilities/PasswordGenerator");
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const Mail_controller_1 = __importDefault(require("../mail/Mail.controller"));
const unlinkAsync = (0, util_1.promisify)(fs_1.default.unlink);
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
        const tempPassword = (0, PasswordGenerator_1.generateRandomPassword)();
        yield dbConfig_1.default.query(`
            CALL SP_Application_Respond(?, ?, ?, @o_status)
        `, [applicationID, status, tempPassword]);
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
    const { path, buffer } = req.file;
    const mailManager = new Mail_controller_1.default();
    const mailContent = { name: "", phoneNumber: "", email: "", courseName: "", courseSchedule: "" };
    try {
        // Use parameterized query to prevent SQL injection
        const result_application = yield dbConfig_1.default.query(`CALL SP_Application_Send(?, ?, ?, ?, ?, @o_status)`, [req.body.nombre, fs_1.default.readFileSync(path), req.body.correo, req.body.telefono, req.body.idCurso]);
        const result = JSON.parse(JSON.stringify(result_application[0][0]));
        //TODO Fix schedules
        const content = {
            name: req.body.nombre,
            phoneNumber: req.body.telefono,
            email: req.body.correo,
            courseName: req.body.curso,
            courseSchedule: 'N/A'
        };
        if (result) {
            yield mailManager.sendMail_FormVerification("testELSPrueba@gmail.com", req.body.correo, "Verificacion de formulario", content);
        }
        //Delete file
        const resultDelete = yield unlinkAsync(path);
        // Send the response
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error.message });
    }
});
exports.sendApplication = sendApplication;
const getApplicationFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idApplication } = req.params;
    try {
        const result = yield dbConfig_1.default.query(`
            CALL SP_GetPaymentReceiptByID(?)
        `, [idApplication]);
        // Verifica que haya un resultado válido y que contenga el campo PaymentReceipt
        if (result[0][0][0]["PaymentReceipt"]) {
            const paymentReceipt = result[0][0][0]["PaymentReceipt"];
            // Configura los encabezados de la respuesta para forzar la descarga del archivo
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=payment_receipt_${idApplication}.pdf`);
            res.send(paymentReceipt);
        }
        else {
            return res.status(404).send('Payment receipt not found.');
        }
    }
    catch (error) {
        res.status(500).send({ error: 'Request Failed', info: error.message });
    }
});
exports.getApplicationFile = getApplicationFile;
//# sourceMappingURL=Application.controller.js.map