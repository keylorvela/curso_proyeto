"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Application_controller_1 = require("../controllers/Application.controller");
const router = express_1.default.Router();
router.get("/", Application_controller_1.getAllApplications);
router.put("/", Application_controller_1.respondToApplication);
router.post("/", Application_controller_1.sendApplication);
exports.default = router;
//# sourceMappingURL=Applications.route.js.map