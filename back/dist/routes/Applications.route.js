"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Application_controller_1 = require("../controllers/Application.controller");
const router = express_1.default.Router();
// Configuración de multer para guardar archivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
//Endpoints
router.get("/", Application_controller_1.getAllApplications);
router.put("/", Application_controller_1.respondToApplication);
router.post("/", upload.single('file'), Application_controller_1.sendApplication);
router.get("/file/:idApplication", Application_controller_1.getApplicationFile);
router.get('/test', (req, res) => {
    res.send("HOLA");
});
exports.default = router;
//# sourceMappingURL=Applications.route.js.map