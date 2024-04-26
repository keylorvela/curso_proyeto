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
exports.updateTreatment = exports.getTreatmentInformation = exports.getTreatmentList = exports.deleteTreatment = exports.createTreatment = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
// Create new treatment
const createTreatment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const result_treatment = yield dbConfig_1.default.query(`
            CALL SP_Treatment_Create(
                "${body.p_name}",
                "${body.p_description}",
                ${body.p_price},
                "${body.p_includes}",
                "${body.p_procedureDuration}",
                "${body.p_effectDuration}",
                "${body.p_information}",
                ${body.p_categoryID},
                @o_status)`);
        const result = JSON.parse(JSON.stringify(result_treatment[0][0]));
        if (result.length > 0 && result[0].o_treatmentID != -1) {
            const imagesPromise = body.p_photos.map((photo) => __awaiter(void 0, void 0, void 0, function* () {
                yield dbConfig_1.default.query(`
                    CALL SP_Image_AddTreatmentImage(
                        "${photo.url}",
                        ${result[0].o_treatmentID},
                        "${photo.imageType}",
                        @o_status
                    )
                `);
            }));
            yield Promise.all(imagesPromise);
        }
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
});
exports.createTreatment = createTreatment;
// Delete specifi treatment
const deleteTreatment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const str_treatmentID = req.params.treatmentID;
    const treatmentID = Number(str_treatmentID) || null;
    // Check if id is a valid input
    if (!treatmentID || treatmentID < 0) {
        res.status(400).send({ error: "Treatment id must be a valid number" });
        return;
    }
    try {
        const result_treatment = yield dbConfig_1.default.query(`CALL SP_Treatment_Delete(${treatmentID}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_treatment[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
});
exports.deleteTreatment = deleteTreatment;
// Get treatment list => CategoryID is optional
const getTreatmentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryID = Number(req.query.categoryID) || null;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    // Check if limit and offset are valid input
    if (limit === null || offset === null) {
        res.status(400).send({ error: "Limit and/or input must be valid numbers" });
        return;
    }
    try {
        const result_treatment = yield dbConfig_1.default.query(`CALL SP_Treatment_ReadAll(${categoryID}, ${limit}, ${offset}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_treatment[0][0]));
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
});
exports.getTreatmentList = getTreatmentList;
// Get treatment information
const getTreatmentInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const str_treatmentID = req.params.treatmentID;
    const treatmentID = Number(str_treatmentID) || null;
    // Check if id is a valid input
    if (!treatmentID || treatmentID < 0) {
        res.status(400).send({ error: "Treatment id must be a valid number" });
        return;
    }
    try {
        const result_treatment = yield dbConfig_1.default.query(`CALL SP_Treatment_SearchFor(${treatmentID}, @o_status)`);
        const result = JSON.parse(JSON.stringify(result_treatment[0][0]));
        const result_images = yield dbConfig_1.default.query(`CALL SP_Image_ReadAllTreatment(${treatmentID}, @o_status)`);
        result[0].Photos = JSON.parse(JSON.stringify(result_images[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
});
exports.getTreatmentInformation = getTreatmentInformation;
// Update a treatment
const updateTreatment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const treatmentID = Number(body.p_treatmentID) || null;
    const categoryID = Number(body.p_categoryID) || null;
    // Check if both id´s are valid input
    if (!treatmentID || !categoryID || treatmentID < 0 || categoryID < 0) {
        res.status(400).send({ error: "Both Ids must be a valid number" });
        return;
    }
    try {
        const result_treatment = yield dbConfig_1.default.query(`
            CALL SP_Treatment_Update(
                ${treatmentID},
                "${body.p_name}",
                "${body.p_description}",
                ${body.p_price},
                "${body.p_includes}",
                "${body.p_procedureDuration}",
                "${body.p_effectDuration}",
                "${body.p_information}",
                ${categoryID},
                @o_status)`);
        const result = JSON.parse(JSON.stringify(result_treatment[0][0]));
        const imagesPromise = body.p_photos.map((photo) => __awaiter(void 0, void 0, void 0, function* () {
            yield dbConfig_1.default.query(`
                CALL SP_Image_UpdateTreatmentImage(${photo.imageID}, "${photo.url}", @o_status)`);
        }));
        yield Promise.all(imagesPromise);
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(500).send({ error: "Petition failed", error_detail: error });
    }
});
exports.updateTreatment = updateTreatment;
//# sourceMappingURL=Treatments.controller.js.map