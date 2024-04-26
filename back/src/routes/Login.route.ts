import { Router } from "express";
import { changePassword, startSession, requestEmail, verifyOTP, updatePasswordWithOTP } from "../controllers/Login.controller";

const router = Router();

router.post("/", startSession)

router.post("/changePassword", changePassword)

router.post("/requestEmail", requestEmail)

router.post("/verifyOTP", verifyOTP)

router.post("/updatePasswordWithOTP", updatePasswordWithOTP)

export default router;