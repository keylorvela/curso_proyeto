import express from "express";
import { getAllStudents, getStudentsInGroup, updateStudent } from "../controllers/studentController";

const router = express.Router();


router.get("/all", getAllStudents);


router.post("/group", getStudentsInGroup);


router.put("/update", updateStudent);

export default router;
