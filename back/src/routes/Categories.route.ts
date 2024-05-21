import { Router } from "express";
import { getTreatmentCategories, createCategory, deleteCategory } from "../controllers/Categories.controller";

const router = Router();

router.get("/", getTreatmentCategories);

router.post("/", createCategory);

router.delete("/:categoryID", deleteCategory);

export default router;