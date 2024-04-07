"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Courses_controller_1 = require("../controllers/Courses.controller");
const router = (0, express_1.Router)();
// Rutas para la gestión de cursos
router.get("/", Courses_controller_1.getCourseList);
router.post("/", Courses_controller_1.createCourse);
router.put("/:courseId", Courses_controller_1.updateCourse);
router.delete("/:courseId", Courses_controller_1.deleteCourse);
router.get("/:courseId", Courses_controller_1.searchCourse);
// Rutas para la gestión de la participación en cursos
router.post("/:courseId/drop-out", Courses_controller_1.dropOutCourse);
router.get("/enrolled/:userID", Courses_controller_1.listEnrolledCourses);
exports.default = router;
//# sourceMappingURL=Courses.route.js.map