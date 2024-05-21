"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Categories_controller_1 = require("../controllers/Categories.controller");
const router = (0, express_1.Router)();
router.get("/", Categories_controller_1.getTreatmentCategories);
router.post("/", Categories_controller_1.createCategory);
router.delete("/:categoryID", Categories_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=Categories.route.js.map