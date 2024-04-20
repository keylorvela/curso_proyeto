"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_controller_1 = require("../controllers/Login.controller");
const router = (0, express_1.Router)();
router.post("/", Login_controller_1.startSession);
router.post("/changePassword", Login_controller_1.changePassword);
router.post("/forgotPassword", Login_controller_1.forgotPassword);
exports.default = router;
//# sourceMappingURL=Login.route.js.map