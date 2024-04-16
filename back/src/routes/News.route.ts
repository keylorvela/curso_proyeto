import express from "express";
import { createNews, getAllNews, deleteNews, updateNews } from "../controllers/newsController";

const router = express.Router();

// Ruta para crear una nueva noticia
router.post("/create", createNews);

// Ruta para obtener todas las noticias de un grupo específico
router.get("/all", getAllNews);

// Ruta para eliminar una noticia por su ID
router.delete("/delete/:newsID", deleteNews);

// Ruta para actualizar una noticia por su ID
router.put("/update/:newsID", updateNews);

export default router;
