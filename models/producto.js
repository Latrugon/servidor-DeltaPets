var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema=Schema({
   nombre: { type: String, required: true },
   categoriaMascota: { type: String, required: true },
   categoriaProducto: { type: String, required: true },
   precio: { type: Number, required: true },

   
  creador: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Usuario",
 },
 creado: { type: Date, default: Date.now() },
/* FORMATO DE JASON PARA CREAR EN POSTMAN...
nombre : "Galletitas Miau",
categoriaMascota : "Gatos",
categoriaProducto : "Comida",
precio :5000
*/


});

const Producto = mongoose.model('producto',ProductoSchema);
module.exports = Producto;