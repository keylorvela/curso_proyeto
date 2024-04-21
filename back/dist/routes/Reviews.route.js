"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Reviews_controller_1 = require("../controllers/Reviews.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", Reviews_controller_1.addReview);
router.delete("/", Reviews_controller_1.removeReview);
router.get("/", Reviews_controller_1.listReviewsOfTreatment);
router.put("/", Reviews_controller_1.addReviewRespond);
exports.default = router;
//# sourceMappingURL=Reviews.route.js.map