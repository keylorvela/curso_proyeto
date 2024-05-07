"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Treatments_controller_1 = require("../controllers/Treatments.controller");
const router = (0, express_1.Router)();
router.post("/", Treatments_controller_1.createTreatment);
router.delete("/:treatmentID", Treatments_controller_1.deleteTreatment);
router.get("/", Treatments_controller_1.getTreatmentList);
router.get("/:treatmentID", Treatments_controller_1.getTreatmentInformation);
router.put("/", Treatments_controller_1.updateTreatment);
router.get("/categories", Treatments_controller_1.getTreatmentCategories);
exports.default = router;
//# sourceMappingURL=Treatments.route.js.map