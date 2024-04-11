import { addReview, removeReview } from "../controllers/Reviews.controller";
import { Router } from "express";
const router = Router();

router.post("/", addReview)

router.post("/", removeReview)

export default router;