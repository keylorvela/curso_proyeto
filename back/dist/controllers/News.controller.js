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
exports.updateNews = exports.deleteNews = exports.getAllNews = exports.createNews = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const createNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, groupID } = req.body;
    if (!title || !content || isNaN(groupID)) {
        res.status(400).send({ error: "All fields are required" });
        return;
    }
    try {
        const result = yield dbConfig_1.default.query(`
            CALL SP_News_Create("${title}", "${content}", ${groupID}, @o_status)
        `);
        const resultStatus = JSON.parse(JSON.stringify(result[0]));
        res.status(200).send(resultStatus[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.createNews = createNews;
const getAllNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupID = Number(req.query.groupID) || null;
    if (!groupID || isNaN(groupID) || groupID < 0) {
        res.status(400).send({ error: "Invalid group ID provided" });
        return;
    }
    try {
        const result = yield dbConfig_1.default.query(`
            CALL SP_News_ReadAll(${groupID}, @o_status)
        `);
        const newsList = JSON.parse(JSON.stringify(result[0][0]));
        res.status(200).send(newsList || []);
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.getAllNews = getAllNews;
const deleteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newsID } = req.body;
    if (isNaN(newsID) || newsID < 0) {
        res.status(400).send({ error: "Invalid news ID provided" });
        return;
    }
    try {
        const result = yield dbConfig_1.default.query(`
            CALL SP_News_Delete(${newsID}, @o_status)
        `);
        const resultStatus = JSON.parse(JSON.stringify(result[0]));
        res.status(200).send(resultStatus[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.deleteNews = deleteNews;
const updateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newsID, title, content } = req.body;
    if (isNaN(newsID) || newsID < 0 || !title || !content) {
        res.status(400).send({ error: "Invalid input provided" });
        return;
    }
    try {
        const result = yield dbConfig_1.default.query(`
            CALL SP_News_Update(${newsID}, "${title}", "${content}", @o_status)
        `);
        const resultStatus = JSON.parse(JSON.stringify(result[0]));
        res.status(200).send(resultStatus[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.updateNews = updateNews;
//# sourceMappingURL=News.controller.js.map