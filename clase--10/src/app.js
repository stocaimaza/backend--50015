/** CLASE 10 **/

const express = require("express"); 
const app = express(); 
const PUERTO = 8080; 
const viewsRouter = require("./routes/views.router");
const exphbs = require("express-handlebars");

app.use(express.static("./src/public"));

//Configuramos handlebars: 
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Routing

app.use("/",  viewsRouter);


//1) Multer
// Middleware de terceros: multer me permite gestionar de forma simple la carga de archivos de archivos al servidor. 

//Instalacion: npm install multer

//Importamos multer: 
const multer = require("multer");

//Para guardar correctamente los archivos podemos configurar el "storage". 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})


//La constante upload va a tener la configuración de multer. 
const upload = multer({storage});

//Configurar la ruta: 

app.post("/upload", upload.single("imagen"), (req, res) => {

    res.send("Lo subimos con exito!!");
} )



app.listen(PUERTO);