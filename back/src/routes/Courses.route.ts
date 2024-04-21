import { Router } from "express";
import { getCourseList, createCourse, updateCourse, deleteCourse, searchCourse } from "../controllers/Courses.controller";

const router = Router();

// Rutas para la gestión de cursos
router.get("/", getCourseList);
router.post("/", createCourse);
router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);
router.get("/:courseId", searchCourse)

export default router;
