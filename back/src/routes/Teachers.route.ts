import express from "express";
import { getAllProfessors, updateProfessor, deleteProfessor, getProfessorInformation } from "../controllers/Teachers.controller";

const router = express.Router();

router.get("/", getAllProfessors);

router.put("/", updateProfessor);

router.delete("/", deleteProfessor);

router.get("/:userID", getProfessorInformation);

export default router;
