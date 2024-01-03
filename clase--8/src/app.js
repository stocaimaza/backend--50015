/** CLASE - 8 ROUTER Y MULTER **/

/*
Temas de hoy: 

1) Express Router. 
2) Servicio de archivos estáticos. 
3) Middleware. 
4) Tipos de Middleware. 
5) Multer. 
6) Consignas de la primer pre entrega. 

*/


//1) Router: es una herramienta que me permite organizar mis rutas en modulos, es decir archivos separados. 

//Ejercicio de practica - Mascotas y Usuarios. 

const express = require("express");
const app = express();
const PUERTO = 8080; 
const usersRouter = require("./routes/users.router"); 
const petsRouter = require("./routes/pets.router");

app.use(express.json()); 
//Esto es un Middleware. 
//Acá le digo a express que voy a recibir datos en formato JSON. 

app.use(express.urlencoded( {extended:true}));
//Se encarga de analizar los datos codificados en la URL y los convierte en un objeto Javascript accesible a atraves de req.body. 

//Routing
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter); 

//Listen 

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})


//2) Servicio de archivos estáticos: 
//Express nos permite tener archivos estaticos, es decir archivos que no cambian en tiempo de ejecucion. Estos pueden ser HTML, CSS, img, etc. 
//Estos recursos van a estar visibles para el cliente de forma directa. 
// Y los vamos a alojar en la carpetiña "public".

//app.use(express.static("public"));

//Prefijo virtual: 
//Si queremos que la carpeta public se llame de otra forma, podemos hacerlo con el siguiente codigo: 

//app.use("/static", express.static("public")); 

//¿Que ventajas me da? 
//-  Organizarme mejor con las rutas. 
//-  Me da una capa de seguridad adicional. 

//Path absoluto: 
//Si nosotros iniciamos el proceso de node desde una carpeta que no es la raíz, puede ser que no encontremos la carpetita "public". 
//Para solucionar esto podemos usar el path absoluto: 

const path = require("path");
//Recuerden que path es un modulo que viene con node y me permite trabajar con las rutas. 

//Atentos: voy a usar dirname, que nos devuelve el path absoluto de la carpeta donde se encuentra el archivo que estamos ejecutando. 

//app.use("/static", express.static(__dirname + "/public"));
//Ejemplo. 

app.use("/static", express.static(path.join(__dirname, "..", "public"))); 
//path.join() nos permite unir dos rutas, en este caso el path absoluto con la carpetiña public.

//3) Middleware. 
//Middleware es una función que se ejecuta entre la petición y la respuesta. Funciona como un puente entre ambas o un intermediario. 

//¿Para que nos sirve? 

//- Autorizar o rechazar usuarios. 
//- Agregar o alterar el contenido de la petición. 
//- Redireccionar a otra ruta. 
//- Puede frenar la ejecución de una petición. 

//Tipos de Middleware: 

//1) Middleware de aplicación. 
//2) Middleware a nivel de endpoint. (ejemplo en users.router.js)
//3) Middlware a nivel de router. 
//4) Middleware de manejo de errores. 
//5) Middleware incorporados. 
//6) Middleware de terceros. 

//Clase que viene, seguimos con los ejemplos. 
//Vengan al after!! 
