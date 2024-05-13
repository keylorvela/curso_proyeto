import { Router } from "express";
import { getUserInformation } from "../../controllers/General/User.controller";

const router = Router();

router.get("/", getUserInformation);

export default router;