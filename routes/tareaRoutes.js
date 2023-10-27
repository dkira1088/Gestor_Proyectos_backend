import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstadoTarea,
} from "../controllers/tareaController.js";

const tareaRouter = express.Router();

tareaRouter.post("/", checkAuth, agregarTarea);
tareaRouter
  .route("/:id")
  .put(checkAuth, actualizarTarea)
  .delete(checkAuth, eliminarTarea);

tareaRouter.post("/estado/:id", checkAuth, cambiarEstadoTarea);

export default tareaRouter;
