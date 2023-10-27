import Proyecto from "../Models/Proyecto.js";
import Tareas from "../Models/Tarea.js";
const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
  res.json({ proyectos });
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    return res.status(404).json({ msg: "Proyecto no encontrado" });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    return res.status(401).json({ msg: "Acción no válida" });
  }

  return res.json(proyecto);
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    return res.status(404).json({ msg: "Proyecto no encontrado" });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    return res.status(401).json({ msg: "Acción no válida" });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    return res.status(404).json({ msg: "Proyecto no encontrado" });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    return res.status(401).json({ msg: "Acción no válida" });
  }

  try {
    await proyecto.deleteOne();

    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {}
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

export {
  obtenerProyecto,
  obtenerProyectos,
  nuevoProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
};
