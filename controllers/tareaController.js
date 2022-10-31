const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

// Crear una nueva Tarea

exports.crearTarea = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  const { proyecto } = req.body;

  try {
    const proyectoEncontrado = await Proyecto.findById(proyecto);

    if (!proyectoEncontrado) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    if (proyectoEncontrado.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  const { proyecto } = req.query;
  try {
    const proyectoEncontrado = await Proyecto.findById(proyecto);

    if (!proyectoEncontrado) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    if (proyectoEncontrado.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  const { proyecto, nombre, estado } = req.body;
  try {
    const proyectoEncontrado = await Proyecto.findById(proyecto);

    const tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    if (!proyectoEncontrado) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    if (proyectoEncontrado.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    const nuevaTarea = {};
    if (nombre) {
      nuevaTarea.nombre = nombre;
    }
    if (estado) {
      nuevaTarea.estado = estado;
    }

    tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id },
      { $set: nuevaTarea },
      { new: true }
    );
    res.json({ tarea });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.eliminarTarea=async(req,res)=>{
  const { proyecto } = req.query;
  try {
    const proyectoEncontrado = await Proyecto.findById(proyecto);

    const tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    if (!proyectoEncontrado) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    if (proyectoEncontrado.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    await Tarea.deleteOne({_id:req.params.id});
    res.json({msg:"Tarea eliminada"})

  

  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
}
