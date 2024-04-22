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
exports.deleteProfessor = exports.updateProfessor = exports.getAllProfessors = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const getAllProfessors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbConfig_1.default.query(`
            CALL SP_Professors_ReadAll(@o_status)
        `);
        const professorsList = JSON.parse(JSON.stringify(result[0][0]));
        res.status(200).send(professorsList || []);
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.getAllProfessors = getAllProfessors;
const updateProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { personID, photo, email, phoneNumber, name } = req.body;
    if (isNaN(personID) || personID < 0 || !email || !name) {
        res.status(400).send({ error: "Invalid input provided" });
        return;
    }
    try {
        yield dbConfig_1.default.query(`
            CALL SP_Professors_Update(${personID}, "${photo}", "${email}", "${phoneNumber}", "${name}", @o_status)
        `);
        const result = yield dbConfig_1.default.query(`
            SELECT @o_status AS o_status
        `);
        const resultStatus = JSON.parse(JSON.stringify(result[0]));
        const professorInfo = result[0][0];
        res.status(200).send(professorInfo || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.updateProfessor = updateProfessor;
const deleteProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.body;
    if (isNaN(userID) || userID < 0) {
        res.status(400).send({ error: "Invalid user ID provided" });
        return;
    }
    try {
        yield dbConfig_1.default.query(`
            CALL SP_Professors_Delete(${userID}, @o_status)
        `);
        const result = yield dbConfig_1.default.query(`
            SELECT @o_status AS o_status
        `);
        const resultStatus = JSON.parse(JSON.stringify(result[0]));
        res.status(200).send(resultStatus[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.deleteProfessor = deleteProfessor;
//# sourceMappingURL=Teachers.controller.js.map