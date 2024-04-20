import { Router } from "express";
import { changePassword, startSession, forgotPassword } from "../controllers/Login.controller";

const router = Router();

router.post("/", startSession)

router.post("/changePassword", changePassword)

router.post("/forgotPassword", forgotPassword)

export default router;