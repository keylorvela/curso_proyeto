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
exports.getUserInformation = void 0;
const dbConfig_1 = __importDefault(require("../../database/dbConfig"));
// Get user information
const getUserInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = Number(req.query.userID) || null;
    if (!userID) {
        res.status(400).send({ error: "User id must be a valid number" });
        return;
    }
    try {
        const resultInformation = yield dbConfig_1.default.query(`
            CALL SP_General_GetUserInformation(${userID}, @o_status)
        `);
        const result = JSON.parse(JSON.stringify(resultInformation[0][0]));
        res.status(200).send(result[0] || {});
    }
    catch (error) {
        res.status(400).send({ error: "Request Failed", info: error });
    }
});
exports.getUserInformation = getUserInformation;
//# sourceMappingURL=User.controller.js.map