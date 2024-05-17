import express from "express";
import multer from 'multer';




import { getAllApplications, testReceive, respondToApplication, sendApplication } from "../controllers/Application.controller";
const router = express.Router();

// Configuración de multer para guardar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });




//Endpoints

router.post("/test", upload.single('file'), testReceive);


router.get("/", getAllApplications);

router.put("/", respondToApplication);

router.post("/", sendApplication);






export default router;
