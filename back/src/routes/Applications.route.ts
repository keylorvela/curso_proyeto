import express from "express";
import { getAllApplications, respondToApplication } from "../controllers/applicationController";

const router = express.Router();


router.get("/all", getAllApplications);


router.put("/respond", respondToApplication);

export default router;
