# Archivos Base para las practicas de HTML y CSS

Hola, ¿cómo estás?

Nos complace dejarte estos archivos para que podás encarar con los mismos las prácticas del módulo de **HTML y CSS**

Para que podás trabajar con estos archivos lo primero será:

1. Descargá estos archivos en un ZIP.
2. Ingresar a la carpeta: `cd baseAppHtml`.
3. Una vez dentro, ejecutar: `npm install`.
4. Terminada la instalación. Ejecutar `npm start`. Ahora ya podés acceder a [localhost:3000](http://localhost:3000)

## Forma de Uso

A continuación te relatamos cómo están construidos estos archivos para que podás usarlos con facilidad:

1. Abrí la carpeta *baseAppHtml* en VS Code.
2. Abrí el archivo `app.js`.

Dentro del archivo `app.js`, vas a encontrar que en la línea 26 hay algo cómo esto: `app.use('/', mainRouter);`. Esto significa que la aplicación está usando un *Route System* y por lo tanto cualquier recurso en la URL del navegador que comience con `/` va a usar el archivo `mainRouter` el cual está ubicado en: [/routes/main.js](/routes/main.js).

Si abrís el archivo [/routes/main.js](/routes/main.js) te darás cuenta que allí hay un ejemplo de ruta tipo *get* la cual se verá así: `router.get('/', mainController.root);`. Esto significa que el *route system* está usando el método `root` del controlador `mainController`. Este último archivo se encuentra ubicado en: [controllers/mainController.js](controllers/mainController.js).

Al abrir el archivo [controllers/mainController.js](controllers/mainController.js) te darás cuenta que la constante `controller` es la que se está exportando y justamente ella es un objeto literal con un solo método, el método `root`. Adicionalmente dentro de este archivo encontrarás las siguiente función:

```js
function readHTML (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}
```

Dicha función te servirá para leer el contenido de cualquier archivo con extensión `html` presente en la carpeta `/views` y posteriormente pasarlo cómo parámetro en el método `send()` de la respuesta así:

```js
const controller = {
	root: (req, res) => {
		// 1. Leyendo el contenido del archivo index.html (/views/index.html)
		let html = readHTML('index'); 
		// 2. Enviando el contenido del archivo en la respuesta del servidor
		res.send(html);
	},
};
```

---

## Ejemplo de uso

Asumiendo que ya guardaste el archivo HTML (ej: **contacto.html**) dentro de la carpeta `/views`. Los pasos a seguir serán:

1. Crear una ruta de tipo *get* en el archivo `/routes/main.js`. Ejemplo:
```js
router.get('/contacto', mainController.contact);
```

2. Crear el método `contact` en el archivo `/controllers/mainController.js`. Ejemplo:
```js
const controller = {
	root: (req, res) => {
		let html = readHTML('index'); 
		res.send(html);
	},
	contacto: (req, res) => {
		let html = readHTML('contacto');
		res.send(html);
	},
}
```