// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.root);

/* GET - Formulario Creación Productos */ 
router.get('/productos/crear', mainController.mostrarFormulario);

/* POST - Guardar el Producto en DB */ 
router.post('/productos/crear', mainController.guardarProducto);

/* DELETE - Borrar un Producto en DB */ 
router.delete('/productos/borrar/:id', mainController.borrarProducto);

module.exports = router;
