import { Router } from "express";
import { getCourseList, createCourse, updateCourse, deleteCourse, dropOutCourse, listEnrolledCourses, searchCourse } from "../controllers/Courses.controller";

const router = Router();

// Rutas para la gestión de cursos
router.get("/", getCourseList);
router.post("/", createCourse);
router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);
router.get("/:courseId", searchCourse)

// Rutas para la gestión de la participación en cursos
router.post("/:courseId/drop-out", dropOutCourse);
router.get("/enrolled/:userID", listEnrolledCourses);

export default router;
