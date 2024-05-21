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
exports.searchCourse = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseList = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const getCourseList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
        res.status(400).send({ error: "Limit and offset must be valid positive numbers" });
        return;
    }
    try {
        const result_course = yield dbConfig_1.default.query(`CALL SP_Course_ReadAll(${limit}, ${offset}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_course[0][0]));
        res.status(200).send(result);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.getCourseList = getCourseList;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // Verificar si los parámetros requeridos están presentes
    if (!body.Name || !body.Description || !body.Duration || !body.Price) {
        res.status(400).send({ error: "At least: Name, Description, Duration, Price requiered" });
        return;
    }
    try {
        const result_course = yield dbConfig_1.default.query(`
            CALL SP_Course_Create(
                '${body.Name}',
                '${body.Description}',
                '${body.Topics}',
                '${body.Includes}',
                '${body.Duration}',
                ${body.Price},
                '${body.CourseImage}',
                '${body.UserTarget}',
                '${body.PayLink}',
                @o_status)`);
        const result = JSON.parse(JSON.stringify(result_course[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.createCourse = createCourse;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = Number(req.params.courseId);
    const body = req.body;
    try {
        const result_course = yield dbConfig_1.default.query(`
            CALL SP_Course_Update(
                ${courseId},
                '${body.Name}',
                '${body.Description}',
                '${body.Topics}',
                '${body.Includes}',
                '${body.Duration}',
                ${body.Price},
                '${body.CourseImage}',
                '${body.UserTarget}',
                '${body.PayLink}',
                @o_status
            )
        `);
        const result = JSON.parse(JSON.stringify(result_course[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = Number(req.params.courseId);
    // Verificar si courseId es un número válido
    if (isNaN(courseId) || courseId <= 0) {
        res.status(400).send({ error: "Invalid course ID" });
        return;
    }
    try {
        const result_course = yield dbConfig_1.default.query(`
            CALL SP_Course_Delete(${courseId}, @o_status)
        `);
        const result = JSON.parse(JSON.stringify(result_course[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.deleteCourse = deleteCourse;
const searchCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = Number(req.params.courseId);
    // Verificar si courseId es un número válido
    if (isNaN(courseId) || courseId <= 0) {
        res.status(400).send({ error: "Invalid course ID" });
        return;
    }
    try {
        const result_course = yield dbConfig_1.default.query(`
            CALL SP_Course_SearchFor(${courseId}, @o_status)
        `);
        const result = JSON.parse(JSON.stringify(result_course[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Request Failed" });
    }
});
exports.searchCourse = searchCourse;
//# sourceMappingURL=Courses.controller.js.map