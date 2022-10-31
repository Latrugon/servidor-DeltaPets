const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  try {
    //crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);

    proyecto.creador = req.usuario.id;

    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ proyectos });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.actualizarProyecto = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(400).json({ msg: "Proyecto no encontrado" });
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json({ proyecto });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.eliminarProyecto = async (req, res) => {
  try {
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(400).json({ msg: "Proyecto no encontrado" });
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    await Proyecto.remove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
