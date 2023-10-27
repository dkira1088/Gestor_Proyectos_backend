import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRouter from "./routes/usuarioRoutes.js";
import proyectoRouter from "./routes/proyectoRoutes.js";
import tareaRouter from "./routes/tareaRoutes.js";

import cors from "cors";

const app = express();

app.use(express.json());

//busca un archivo .env para las variables de entorno
dotenv.config();

//conecta con el archivo de configuración a la base de datos de mongoDB
conectarDB();

//Configurar CORS
const whitList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    }
  },
};

app.use(cors(corsOptions));

//Routing
app.use("/api/usuarios", usuarioRouter);
app.use("/api/proyectos", proyectoRouter);
app.use("/api/tareas", tareaRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
