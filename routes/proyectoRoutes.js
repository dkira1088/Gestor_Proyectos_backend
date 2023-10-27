import express from "express";
import {
  obtenerProyecto,
  obtenerProyectos,
  nuevoProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
} from "../controllers/proyectoController.js";
import checkAuth from "../middleware/checkAuth.js";

const proyectoRouter = express.Router();

proyectoRouter
  .route("/")
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);

proyectoRouter
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

proyectoRouter.post("/agregar-colaborador/:id", checkAuth, agregarColaborador);
proyectoRouter.delete(
  "/eliminar-colaborador/:id",
  checkAuth,
  eliminarColaborador
);

export default proyectoRouter;
