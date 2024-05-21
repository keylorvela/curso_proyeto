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
exports.deleteCategory = exports.createCategory = exports.getTreatmentCategories = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const getTreatmentCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result_categories = yield dbConfig_1.default.query(`CALL SP_Categories_GetTreatmentCategories()`);
        const result = JSON.parse(JSON.stringify(result_categories[0][0]));
        res.status(200).send(result);
    }
    catch (error) {
        res.status(401).send({ error: "Request Failed", info: error });
    }
});
exports.getTreatmentCategories = getTreatmentCategories;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const result_categories = yield dbConfig_1.default.query(`CALL SP_Categories_Create("${body.CategoryName}", @o_status)`);
        const result = JSON.parse(JSON.stringify(result_categories[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(401).send({ error: "Request Failed", info: error });
    }
});
exports.createCategory = createCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryID = Number(req.params.categoryID) || null;
    if (isNaN(categoryID) || categoryID <= 0) {
        res.status(400).send({ error: "Invalid category ID" });
        return;
    }
    try {
        const result_categories = yield dbConfig_1.default.query(`CALL SP_Categories_Delete(${categoryID}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_categories[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(401).send({ error: "Request Failed", info: error });
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=Categories.controller.js.map