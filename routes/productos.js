const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productosController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//crea productos
// api/productos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del producto es obligatorio").not().isEmpty()],
  productoController.crearProducto
);

// Obtener productos

router.get("/", auth, productoController.obtenerProductos);

//Actualizar producto vía ID
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del producto es obligatorio").not().isEmpty()],
  productoController.actualizarProducto
);

//Eliminar un producto
router.delete(
  "/:id",
  auth,
  productoController.eliminarProducto
);


module.exports = router;
