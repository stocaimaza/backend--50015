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



const httpServer = app.listen(PUERTO);

//Socket.io:

//1) Instalamos con el comando: npm install socket.io
//2) Lo importamos.

const socket = require("socket.io");

//3) Me guardo una referencia de mi servidor (httpServer)
//4) Configuramos socket.io: 

const io = socket(httpServer);

//5) Configuramos el primer evento, que es el "connection":

io.on("connection", (socket) => {
    console.log("Un cliente se conecto");

    socket.on("mensaje", (data) => {
        console.log(data);
        io.sockets.emit("mensaje", data);
    })

    //Ahora el servidor le va a enviar un mensaje al cliente. 

    socket.emit("saludito", "Hola cliente, ¿cómo estas?");
})



