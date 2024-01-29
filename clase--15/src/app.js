/* ACTIVIDAD INTEGRADORA - CODEREST (PINTEREST DE LA SALADA) */

//1)Instalen las dependencias: npm i express express-handlebars mongoose multer. 

//2)Importamos los módulos e inicializamos nuestra app. 

const express = require("express");
const app = express(); 
const exphbs = require("express-handlebars");
const multer = require("multer"); 
const PUERTO = 8080;
const imagenRouter = require("./routes/imagen.router.js");
require("../src/database.js");

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Midlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
app.use(multer({storage}).single("image"));

//Rutas
app.use("/", imagenRouter);


//Iniciamos el servidor

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})