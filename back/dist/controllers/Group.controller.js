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
exports.deleteGroup = exports.dropOutGroup = exports.listEnrolledGroup = exports.updateGroup = exports.createGroup = exports.getGroupInformation = exports.listGroupByCourse = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const listGroupByCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = Number(req.params.courseId);
    // Verificar si courseId es un número válido
    if (isNaN(courseId) || courseId <= 0) {
        res.status(400).send({ error: "Invalid course ID" });
        return;
    }
    try {
        const result_group = yield dbConfig_1.default.query(`CALL SP_Group_ReadAll_ByCourse(${courseId}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_group[0][0]));
        res.status(200).send(result);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.listGroupByCourse = listGroupByCourse;
const getGroupInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = Number(req.params.groupId);
    // Verificar si courseId es un número válido
    if (isNaN(groupId) || groupId <= 0) {
        res.status(400).send({ error: "Invalid group ID" });
        return;
    }
    try {
        const result_group = yield dbConfig_1.default.query(`CALL SP_Group_GetGroupInformation(${groupId}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_group[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.getGroupInformation = getGroupInformation;
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // Verificar si los parámetros requeridos están presentes
    if (!body.StartingDate || !body.ScheduleDate || !body.ScheduleHour || !body.Capacity || !body.CourseID) {
        res.status(400).send({ error: "All parameters are requiered" });
        return;
    }
    try {
        const result_group = yield dbConfig_1.default.query(`
            CALL SP_Group_Create(
                '${body.StartingDate}',
                '${body.ScheduleDate}',
                '${body.ScheduleHour}',
                ${body.Capacity},
                ${body.CourseID},
                @o_status)`);
        const result = JSON.parse(JSON.stringify(result_group[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.createGroup = createGroup;
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = Number(req.params.groupId);
    const body = req.body;
    if (isNaN(groupId) || groupId <= 0) {
        res.status(400).send({ error: "All parameters are requiered" });
        return;
    }
    try {
        const result_group = yield dbConfig_1.default.query(`
            CALL SP_Group_Update(
                ${groupId},
                '${body.StartingDate}',
                '${body.ScheduleDate}',
                '${body.ScheduleHour}',
                ${body.Capacity},
                @o_status
            )
        `);
        const result = JSON.parse(JSON.stringify(result_group[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.updateGroup = updateGroup;
const listEnrolledGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = Number(req.params.userID);
    if (isNaN(userID) || userID <= 0) {
        res.status(400).send({ error: "Invalid user ID" });
        return;
    }
    try {
        const result_group = yield dbConfig_1.default.query(`
            CALL SP_Group_ListEnrolled(${userID})
        `);
        const result = JSON.parse(JSON.stringify(result_group[0][0]));
        res.status(200).send(result);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.listEnrolledGroup = listEnrolledGroup;
const dropOutGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, groupID } = req.body;
    if (!userID || !groupID) {
        res.status(400).send({ error: "Both userID and groupID are required" });
        return;
    }
    try {
        const result_group = yield dbConfig_1.default.query(`
            CALL SP_Group_DropOut(${userID}, ${groupID}, @o_status)
        `);
        const result = JSON.parse(JSON.stringify(result_group[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.dropOutGroup = dropOutGroup;
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = Number(req.params.groupId);
    // Verificar si courseId es un número válido
    if (isNaN(groupId) || groupId <= 0) {
        res.status(400).send({ error: "Invalid course ID" });
        return;
    }
    try {
        const result_group = yield dbConfig_1.default.query(`
            CALL SP_Group_Delete(${groupId}, @o_status)
        `);
        const result = JSON.parse(JSON.stringify(result_group[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.deleteGroup = deleteGroup;
//# sourceMappingURL=Group.controller.js.map