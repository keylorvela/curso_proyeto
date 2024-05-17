import express from "express";
import multer from 'multer';




import { getAllApplications, respondToApplication, sendApplication, getApplicationFile } from "../controllers/Application.controller";
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



router.get("/", getAllApplications);

router.put("/", respondToApplication);

router.post("/",  upload.single('file'), sendApplication);

router.get("/file/:idApplication", getApplicationFile);



export default router;
