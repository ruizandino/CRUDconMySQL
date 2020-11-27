var express= require('express');
const peliculasController = require('../controllers/peliculasController');
var router = express.Router();
//Creacion
router.get("/crear", peliculasController.crear); //para que el usuario pueda ver el formulario 
router.post("/crear", peliculasController.guardado); //procesa la info del formulario crear

//lectura
router.get("/", peliculasController.listado);

//Detalle
router.get("/:id", peliculasController.detalle);

//Actualizacion
router.get("/editar/:id", peliculasController.editar);
router.post("/editar/:id", peliculasController.actualizar);

//borrado
router.post("/borrar/:id", peliculasController.borrar);



module.exports= router;