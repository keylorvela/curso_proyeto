import { Router } from "express";
import { getTreatmentList, getTreatmentInformation, createTreatment, deleteTreatment, updateTreatment, getTreatmentCategories } from "../controllers/Treatments.controller"

const router = Router();

router.post("/", createTreatment)

router.delete("/:treatmentID", deleteTreatment)

router.get("/", getTreatmentList)

router.get("/categories", getTreatmentCategories)

router.get("/:treatmentID", getTreatmentInformation)

router.put("/", updateTreatment)

export default router;