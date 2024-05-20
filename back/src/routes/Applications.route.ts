import express from "express";
import multer from 'multer';




import { getAllApplications, respondToApplication, sendApplication, getApplicationFile } from "../controllers/Application.controller";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp');  // Directorio temporal
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.post("/",  upload.single('file'), sendApplication);



//Endpoints

router.get("/", getAllApplications);

router.put("/", respondToApplication);


router.get("/file/:idApplication", getApplicationFile);






router.get('/test', (req,res) => {
    res.send("aaHOLA");
} )



export default router;
