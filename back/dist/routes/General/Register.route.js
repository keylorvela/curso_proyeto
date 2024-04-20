"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Register_controller_1 = require("../../controllers/General/Register.controller");
const router = (0, express_1.Router)();
router.post("/", Register_controller_1.registerUser);
exports.default = router;
//# sourceMappingURL=Register.route.js.map