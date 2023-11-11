import express from "express";
import {
  obtenerProyecto,
  obtenerProyectos,
  nuevoProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  buscarColaborador,
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

proyectoRouter.post("/colaboradores", checkAuth, buscarColaborador);
proyectoRouter.post("/colaboradores/:id", checkAuth, agregarColaborador);
proyectoRouter.post(
  "/eliminar-colaborador/:id",
  checkAuth,
  eliminarColaborador
);

export default proyectoRouter;
