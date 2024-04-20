import express from "express";
import { getAllStudents, getStudentsInGroup, updateStudent } from "../controllers/studentController";

const router = express.Router();


router.get("/", getAllStudents);


router.get("/group", getStudentsInGroup);


router.put("/", updateStudent);

export default router;
