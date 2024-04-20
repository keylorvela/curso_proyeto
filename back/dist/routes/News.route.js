"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const News_controller_1 = require("../controllers/News.controller");
const router = express_1.default.Router();
// Ruta para crear una nueva noticia
router.post("/", News_controller_1.createNews);
// Ruta para obtener todas las noticias de un grupo específico
router.get("/", News_controller_1.getAllNews);
// Ruta para eliminar una noticia por su ID
router.delete("/:newsID", News_controller_1.deleteNews);
// Ruta para actualizar una noticia por su ID
router.put("/", News_controller_1.updateNews);
exports.default = router;
//# sourceMappingURL=News.route.js.map