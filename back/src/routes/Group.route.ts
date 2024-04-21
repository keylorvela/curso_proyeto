import { Router } from "express";
import { createGroup, updateGroup, listEnrolledGroup, dropOutGroup, deleteGroup, listGroupByCourse } from "../controllers/Group.controller";
const router = Router();

router.post("/", createGroup);

router.put("/:groupId", updateGroup);

router.delete("/:groupId", deleteGroup);

router.post("/drop-out", dropOutGroup);

router.get("/enrolled/:userID", listEnrolledGroup);

router.get("/:courseId", listGroupByCourse);

export default router;
