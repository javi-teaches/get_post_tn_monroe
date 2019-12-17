const fs = require('fs');
const path = require('path');

const ubicacionProductosJSON = path.join(__dirname, '../data/productos.json');

let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');

const controller = {
	root: (req, res) => {
		let productos = JSON.parse(contenidoProductosJSON);
		res.render('index', { productos });
	},
	mostrarFormulario: (req, res) => {
		res.render('formularioCreacion');
	},
	guardarProducto: (req, res) => {
		// creo array vació
		let arrayDeProductos = [];
		
		// Si el archivo no está vacío 
		if (contenidoProductosJSON != '') {
			// tomo el contenido y lo convierto en un formato de Array de objetos literales
			arrayDeProductos = JSON.parse(contenidoProductosJSON);
		}

		// Genero el id para el producto
		req.body = {
			id: arrayDeProductos.length + 1,
			...req.body
		};

		req.body.creador = 'Producto creado por Javi';
		
		// Inserto el producto nuevo
		arrayDeProductos.push(req.body);
		
		// Convierto el arrayDeProductos a JSON
		let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
		
		// guardo el array completo en el archivo JSON
		fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);
		
		// Mensaje de éxito
		res.send('¡Producto creado con éxitooooo!');
	},
	borrarProducto: (req, res) => {
		let productosArray = JSON.parse(contenidoProductosJSON);
		let productosSinElQueBorramos = productosArray.filter(function (unProducto) {
			return unProducto.id != req.params.id;
		})
		// guardo el array con los productos finales
		fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(productosSinElQueBorramos, null, ' '));
		res.redirect('/');
	}
};

module.exports = controller
