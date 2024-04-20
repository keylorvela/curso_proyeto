"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Students_controllers_1 = require("../controllers/Students.controllers");
const router = express_1.default.Router();
router.get("/", Students_controllers_1.getAllStudents);
router.get("/group", Students_controllers_1.getStudentsInGroup);
router.put("/", Students_controllers_1.updateStudent);
exports.default = router;
//# sourceMappingURL=Students.route.js.map