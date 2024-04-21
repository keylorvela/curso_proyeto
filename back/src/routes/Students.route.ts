import express from "express";
import { getAllStudents, getStudentsInGroup, updateStudent, registerStudentInGroup } from "../controllers/Students.controllers";

const router = express.Router();


router.get("/", getAllStudents);

router.get("/group", getStudentsInGroup);

router.put("/", updateStudent);

router.post("/", registerStudentInGroup);

export default router;
