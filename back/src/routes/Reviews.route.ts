import { addReview, removeReview, listReviewsOfTreatment, addReviewRespond } from "../controllers/Reviews.controller";
import { Router } from "express";
const router = Router();

router.post("/", addReview);

router.delete("/", removeReview);

router.get("/", listReviewsOfTreatment);

router.put("/", addReviewRespond);

export default router;