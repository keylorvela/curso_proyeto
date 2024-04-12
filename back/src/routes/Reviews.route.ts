import { addReview, removeReview } from "../controllers/Reviews.controller";
import { Router } from "express";
const router = Router();

router.post("/", addReview);

router.delete("/", removeReview);

router.get("/", (req, res) => {res.status(200).json({saludo: "Desde get Review :)"})});

router.put("/", (req, res) => {res.status(200).json({saludo: "Desde put Review :)"})});

export default router;