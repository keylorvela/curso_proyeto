import express from "express";
import { getAllProfessors, updateProfessor, deleteProfessor } from "../controllers/Teachers.controller";

const router = express.Router();

router.get("/", getAllProfessors);

router.put("/", updateProfessor);

router.delete("/:userID", deleteProfessor);

export default router;
