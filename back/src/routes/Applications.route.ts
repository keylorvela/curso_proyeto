import express from "express";
import { getAllApplications, respondToApplication, sendApplication } from "../controllers/Application.controller";

const router = express.Router();

router.get("/", getAllApplications);

router.put("/", respondToApplication);

router.post("/", sendApplication);

export default router;
