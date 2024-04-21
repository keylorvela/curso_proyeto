"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Group_controller_1 = require("../controllers/Group.controller");
const router = (0, express_1.Router)();
router.post("/", Group_controller_1.createGroup);
router.put("/:groupId", Group_controller_1.updateGroup);
router.delete("/:groupId", Group_controller_1.deleteGroup);
router.post("/drop-out", Group_controller_1.dropOutGroup);
router.get("/enrolled/:userID", Group_controller_1.listEnrolledGroup);
router.get("/:courseId", Group_controller_1.listGroupByCourse);
exports.default = router;
//# sourceMappingURL=Group.route.js.map