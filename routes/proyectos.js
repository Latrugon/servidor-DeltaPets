const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectosController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//crea proyectos
// api/proyectos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.crearProyecto
);

// Obtener proyectos

router.get("/", auth, proyectoController.obtenerProyectos);

//Actualizar proyecto vía ID
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.actualizarProyecto
);

//Eliminar un proyecto
router.delete(
  "/:id",
  auth,
  proyectoController.eliminarProyecto
);


module.exports = router;
