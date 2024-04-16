import express from "express";
import { getAllProfessors, updateProfessor, deleteProfessor } from "../controllers/professorController";

const router = express.Router();

router.get("/all", getAllProfessors);

router.put("/update", updateProfessor);

router.delete("/delete/:userID", deleteProfessor);

export default router;
