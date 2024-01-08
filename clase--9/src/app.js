/** CLASE 9 - MOTORES DE PLANTILLLAS **/

//Temas de hoy: 
//1) ¿Que es un motor de plantilla?
//2) Handlebars, instalacion y uso. 
//3) Estructuras, condicionales y ciclos. 
//4) Organizamos el router de Handlebars. 
//5) Trabajamos con la carpeta public, con js y css. 

//2) Instalacion: ejecutamos el siguiente comando: npm i express-handlebars

//Despues de instalar, vamos a organizar nuestra APP. 

const express = require("express"); 
const app = express(); 
const PUERTO = 8080; 
const viewsRouter = require("./routes/views.router");

//Me traigo express-handlebars: 
const exphbs = require("express-handlebars"); 

//Configuración del motor de plantillas: 
//Le decimos a Express que cuando vea un archivo de extensión "handlebars" utilice el motor de plantillas : "handlebars". 
app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars");
//Nuevamente le decimos que la vista de nuestra aplicación es desarrollada con Handlebars. 

app.set("views", "./src/views");
//Acá le decimos a express donde tiene que ir a buscar los archivos "handlebars".

//Usamos el router: 

app.use(express.static("./src/public"));
app.use("/", viewsRouter);





//Estructuras, condicionales y ciclos. 

//layout: suele contenener  las plantillas que actuan con diseños para nuestra aplicación. Acá tenemos el header, footer.. etc. 

//partials: lo vamos a usar para fragmentos de codigo reutilizable. 
//Ejemplo: card de un productiño. 





app.listen(PUERTO);