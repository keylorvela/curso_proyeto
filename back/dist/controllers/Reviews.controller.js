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
exports.addReviewRespond = exports.listReviewsOfTreatment = exports.removeReview = exports.addReview = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { p_name, p_reviewContent, p_stars, p_treatmentID } = req.body;
    if (p_name == "" || p_reviewContent == "" || isNaN(p_treatmentID)) {
        res.status(400).send({ error: "All fieds requiered" });
        return;
    }
    try {
        const result_reviews = yield dbConfig_1.default.query(`
            CALL SP_Reviews_Add_Review(
                "${p_name}",
                "${p_reviewContent}",
                ${p_stars},
                ${p_treatmentID},
                @o_status)
        `);
        const result = JSON.parse(JSON.stringify(result_reviews[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.addReview = addReview;
const removeReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (isNaN(id) || id <= 0) {
        res.status(400).send({ error: "Id enter is not valid" });
        return;
    }
    try {
        const result_reviews = yield dbConfig_1.default.query(`CALL SP_Reviews_Remove_Review(${id}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_reviews[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.removeReview = removeReview;
const listReviewsOfTreatment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { treatment_id } = req.body;
    if (isNaN(treatment_id) || treatment_id <= 0) {
        res.status(400).send({ error: "Id enter is not valid" });
        return;
    }
    try {
        const result_reviews = yield dbConfig_1.default.query(`CALL SP_Reviews_ReadAll(${treatment_id}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_reviews[0][0]));
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.listReviewsOfTreatment = listReviewsOfTreatment;
const addReviewRespond = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { review_id, respond } = req.body;
    if (isNaN(review_id) || review_id <= 0 || respond.length <= 0) {
        res.status(400).send({ error: "Input are not valid: Id must be an interger > 0 AND response cannot be empty" });
        return;
    }
    try {
        const result_reviews = yield dbConfig_1.default.query(`CALL SP_Reviews_Respond(${review_id}, "${respond}", @o_status)`);
        const result = JSON.parse(JSON.stringify(result_reviews[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.addReviewRespond = addReviewRespond;
//# sourceMappingURL=Reviews.controller.js.map