"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_controller_1 = require("../controllers/Login.controller");
const router = (0, express_1.Router)();
router.post("/", Login_controller_1.startSession);
router.post("/changePassword", Login_controller_1.changePassword);
router.post("/requestEmail", Login_controller_1.requestEmail);
router.post("/verifyOTP", Login_controller_1.verifyOTP);
router.post("/updatePasswordWithOTP", Login_controller_1.updatePasswordWithOTP);
exports.default = router;
//# sourceMappingURL=Login.route.js.map