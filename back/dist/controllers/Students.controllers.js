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
exports.registerStudentInGroup = exports.updateStudent = exports.getStudentsInGroup = exports.getAllStudents = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbConfig_1.default.query(`
            CALL SP_Students_ReadAll(@o_status)
        `);
        const studentsList = JSON.parse(JSON.stringify(result[0][0]));
        res.status(200).send(studentsList || []);
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.getAllStudents = getAllStudents;
const getStudentsInGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupID = Number(req.query.groupID) || null;
    if (!groupID || isNaN(groupID) || groupID < 0) {
        res.status(400).send({ error: "Invalid group ID provided" });
        return;
    }
    try {
        const result = yield dbConfig_1.default.query(`
            CALL SP_Students_ReadAll_inGroup(${groupID}, @o_status)
        `);
        const studentsList = JSON.parse(JSON.stringify(result[0][0]));
        res.status(200).send(studentsList || []);
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.getStudentsInGroup = getStudentsInGroup;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { personID, photo, email, phoneNumber, name } = req.body;
    if (isNaN(personID) || personID < 0 || !email || !name) {
        res.status(400).send({ error: "Invalid input provided" });
        return;
    }
    try {
        const result_Update = yield dbConfig_1.default.query(`
            CALL SP_Students_Update(${personID}, "${photo}", "${email}", "${phoneNumber}", "${name}", @o_status)
        `);
        const result = JSON.parse(JSON.stringify(result_Update[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.updateStudent = updateStudent;
const registerStudentInGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (isNaN(body.UserID) || body.UserID < 0 || isNaN(body.GroupID) || body.GroupID < 0) {
        res.status(400).send({ error: "Invalid IDs provided" });
        return;
    }
    try {
        const result_RegStudent = yield dbConfig_1.default.query(`
            CALL SP_Students_AddStudentToGroup(${body.UserID}, ${body.GroupID}, @o_status)
        `);
        const result = JSON.parse(JSON.stringify(result_RegStudent[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.registerStudentInGroup = registerStudentInGroup;
//# sourceMappingURL=Students.controllers.js.map