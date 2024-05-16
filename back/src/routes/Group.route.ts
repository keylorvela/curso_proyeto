import { Router } from "express";
import { createGroup, updateGroup, listEnrolledGroup, dropOutGroup, deleteGroup, listGroupByCourse, getGroupInformation, getGroupsOfTeacher } from "../controllers/Group.controller";
const router = Router();

router.post("/", createGroup);

router.put("/:groupId", updateGroup);

router.delete("/:groupId", deleteGroup);

router.post("/drop-out", dropOutGroup);

router.get("/enrolled/:userID", listEnrolledGroup);

router.get("/:courseId", listGroupByCourse);

router.get("/information/:groupId", getGroupInformation);

router.get("/teacherGroups/:userID", getGroupsOfTeacher);

export default router;
