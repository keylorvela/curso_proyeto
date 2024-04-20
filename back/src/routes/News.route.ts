import express from "express";
import { createNews, getAllNews, deleteNews, updateNews } from "../controllers/News.controller";

const router = express.Router();

// Ruta para crear una nueva noticia
router.post("/", createNews);

// Ruta para obtener todas las noticias de un grupo específico
router.get("/", getAllNews);

// Ruta para eliminar una noticia por su ID
router.delete("/:newsID", deleteNews);

// Ruta para actualizar una noticia por su ID
router.put("/", updateNews);

export default router;
