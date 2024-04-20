import { Router } from "express";
import { registerUser } from "../../controllers/General/Register.controller";

const router = Router();

router.post("/", registerUser);

export default router;