import express from "express";
import { getAllStudents, getStudentsInGroup, updateStudent } from "../controllers/Students.controllers";

const router = express.Router();


router.get("/", getAllStudents);


router.get("/group", getStudentsInGroup);


router.put("/", updateStudent);

export default router;
