const {restart} = require("nodemon");
const Producto = require("../models/producto");


function saveProducto(req, res) {
   myProducto = new Producto(req.body);
   myProducto.save((err, result) => {
      res.status(200).send({message: result});
   });
}
function buscarData(req, res) {
   var idProducto = req.params.id;
   Producto.findById(idProducto).exec((err, result) => {
      if (err) {res.status(500).send({message: 'Error al momento de ejecutar la solicitud'});
      } else {
         if (!result) {
            res.status(404).send({message: 'El registro a buscar no se encuentra disponible'});
         } else {res.status(200).send({result});}
      }
   });
}
function listarAllData(req, res) {
   var idProducto = req.params.idb;
   if (!idProducto) { var result = Producto.find({}).sort('nombre');
   } else {var result = Producto.find({_id: idProducto}).sort('nombre');
   }
   result.exec(function (err, result) {
      if (err) {
         res.status(500).send({message: 
            'Error al momento de ejecutar la solicitud'});
      } else {
         if (!result) {
            res.status(404).send({message: 
            'El registro a buscar no se encuentra disponible'
            });
         } else {res.status(200).send({result
            });
         }
      }
   })
}
function updateProducto(req, res) {
   var id = req.params.id;
   Producto.findOneAndUpdate(
     { _id: id },
     req.body,
     { new: true },
     function (err, Producto) {
       if (err) res.send(err);
       res.json(Producto);
     }
   );
}
function deleteProducto(req, res) {
   var id = req.params.id;
   Producto.findByIdAndRemove(id, function (err, producto) {
     if (err) {
       return res.json(500, {
         message: "No hemos encontrado la carrera",
       });
     }
     return res.json(producto);
   });
}

 //Filtros personalizados
function listPost( req, res){

   let search = req.params.search;
   let queryParam ={}
   if( search){
      queryParam = {
         $or:[
            {nombre: {$regex: search, $options: "i" }}, 
            {categoriaMascota: {$regex: search, $options: "i" }},
            {categoriaProducto: {$regex: search, $options: "i" }},
         ]
      };
   }

   query = Producto.find( queryParam).sort('created');
   query.exec( (err, result) =>{
      if(err){
          res.status(500).send( {message: err });
      }else{
          res.status(200).send( result );
      }
  });
}
function listPostMascota ( req, res){

   let search = req.params.search;
   let queryParam ={}
   if( search){
      queryParam = {
         $or:[
            //{nombre: {$regex: search, $options: "i" }}, 
            {categoriaMascota: {$regex: search, $options: "i" }},
           // {categoriaProducto: {$regex: search, $options: "i" }},
         ]
      };
   }

   query = Producto.find( queryParam).sort('created');
   query.exec( (err, result) =>{
      if(err){
          res.status(500).send( {message: err });
      }else{
          res.status(200).send( result );
      }
  });
}
function listPostProducto ( req, res){

   let search = req.params.search;
   let queryParam ={}
   if( search){
      queryParam = {
         $or:[
            //{nombre: {$regex: search, $options: "i" }}, 
            //{categoriaMascota: {$regex: search, $options: "i" }},
           {categoriaProducto: {$regex: search, $options: "i" }},
         ]
      };
   }

   query = Producto.find( queryParam).sort('created');
   query.exec( (err, result) =>{
      if(err){
          res.status(500).send( {message: err });
      }else{
          res.status(200).send( result );
      }
  });
}

module.exports = {
   saveProducto, listPost, buscarData, listarAllData,
   updateProducto, deleteProducto, listPostMascota,
   listPostProducto
}