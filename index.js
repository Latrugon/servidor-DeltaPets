const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const ControllerProducto=require('./controllers/ControllerProducto');

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//habilitar cors
app.use(cors());

//Habilite express.json
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 
4000;

//importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));



//Producto
app.post('/crear', ControllerProducto.saveProducto);
app.get('/buscar/:id', ControllerProducto.buscarData);
app.get('/buscarall/:id?', ControllerProducto.listarAllData);
app.delete('/borrar/:id', ControllerProducto.deleteProducto);
app.put('/actualizar/:id', ControllerProducto.updateProducto);
app.get('/post/list/:search?', ControllerProducto.listPost);
app.get('/post/catMascota/:search?', ControllerProducto.listPostMascota);
app.get('/post/catProducto/:search?', ControllerProducto.listPostProducto);

//app.post('/auth/test', authController.verifyToken, authController.test);

// arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT} `);
});
