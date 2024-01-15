const express = require("express");
const app = express(); 
const PUERTO = 8080; 
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const viewsRouter = require("./routes/views.router");

//Middleware para archivos estáticos
app.use(express.static("./src/public"));

//Configuramos handlebars
app.engine("handlebars", exphbs.engine()); 
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Routing
app.use("/", viewsRouter); 

const httpServer = app.listen(PUERTO);
//Me guardo una referencia de mi servidor. 

//Socket.io: 

//Creamos una instancia de socket.io pasandole como parametro el servidor: 

const io = new socket.Server(httpServer);

//Vamos a crear un array que guarde los mensajes de todos los participantes: 

let messages = []; 

//Establecemos la conecctiooon!
//io es la instancia de socket.io
//on es el método para escuchar eventos
//El primer parametro es el evento que queremos escuchar
//El segundo parametro es un callback que se va a ejecutar cuando se emita el evento. 
//el callback recibe como parametro los datos que se envian desde el cliente. 

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", data => {
        messages.push(data);
        io.emit("messagesLogs", messages);
        //Con emit emitimos eventos desde el servidor al cliente. 
    })
})
