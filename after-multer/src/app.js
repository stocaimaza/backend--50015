/** AFTER CLASS MULTER**/

//Creamos nuestro servidor con express

const express = require("express");
const app = express(); 
const PUERTO = 8080; 
const exphbs = require("express-handlebars");

//Configurar handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware
app.use(express.static("src/public"));

//Rutas

// app.get("/", (req, res) => {
//     res.send("HolaMundillo!")
// })


//Multer es un middleware de terceros que nos permite subir archivos al servidor. 

//instalamos: npm i multer
//importamos: 

const multer = require("multer");

//Configuramos un storage: 
//Esto es un objeto que tiene dos propiedades: destination y filename. Como y donde se van a guardar los nuevos archivines. 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/public/img");
        //Carpeta donde se guardan las imágenes 
    },
    filename: (req, file, cb)=> {
        cb(null, file.originalname);
        //Mantengo el nombre original
    }
    
})


//Creamos el middleware de carga: 
// const upload = multer({dest:"src/public/img"});
const upload = multer({storage: storage});

app.post("/", upload.single("imagen") ,(req, res) => {
    res.send("Archivo cargado!");
})

//Practicamos usando handlebars: 

app.get("/", (req, res) => {
    res.render("index");
})





app.listen(PUERTO);