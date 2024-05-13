"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../../controllers/General/User.controller");
const router = (0, express_1.Router)();
router.get("/", User_controller_1.getUserInformation);
exports.default = router;
//# sourceMappingURL=User.route.js.map