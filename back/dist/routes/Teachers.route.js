"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Teachers_controller_1 = require("../controllers/Teachers.controller");
const router = express_1.default.Router();
router.get("/", Teachers_controller_1.getAllProfessors);
router.put("/", Teachers_controller_1.updateProfessor);
router.delete("/:userID", Teachers_controller_1.deleteProfessor);
exports.default = router;
//# sourceMappingURL=Teachers.route.js.map