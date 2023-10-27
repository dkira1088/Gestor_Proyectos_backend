import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const usuarioRouter = express.Router();

//Autenticación, Registro, Confirmación Usuarios

//Crea un nuevo usuario
usuarioRouter.post("/", registrar);
usuarioRouter.post("/login", autenticar);
usuarioRouter.get("/confirmar/:token", confirmar);
usuarioRouter.post("/olvide-password", olvidePassword);
usuarioRouter.get("/olvide-password/:token", comprobarToken);
usuarioRouter.post("/olvide-password/:token", nuevoPassword);

usuarioRouter.get("/perfil", checkAuth, perfil);

export default usuarioRouter;
