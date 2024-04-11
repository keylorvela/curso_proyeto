import { Router } from "express";
import { changePassword, registerUser, startSession } from "../controllers/Login.controller";

const router = Router();

router.post("/", startSession)

router.post("/register", registerUser)

router.post("/changePassword", changePassword)

export default router;