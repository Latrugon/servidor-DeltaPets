const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

exports.crearProducto = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  try {
    //crear un nuevo Producto
    const producto = new Producto(req.body);

    producto.creador = req.usuario.id;

    producto.save();
    res.json(producto);
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ productos });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.actualizarProducto = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  const { nombre } = req.body;
  const nuevoProducto = {};

  if (nombre) {
    nuevoProducto.nombre = nombre;
  }

  try {
    let producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(400).json({ msg: "Producto no encontrado" });
    }

    if (producto.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    producto = await Producto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProducto },
      { new: true }
    );

    res.json({ producto });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    let producto = await producto.findById(req.params.id);

    if (!producto) {
      return res.status(400).json({ msg: "Producto no encontrado" });
    }

    if (producto.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    await Producto.remove({ _id: req.params.id });
    res.json({ msg: "Producto eliminado" });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
