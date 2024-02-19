/** CLASE 19 - COOKIES, SESSIONS & STORAGE 2 **/

//Recordemos: cookies y sessions. 

//Una sesión es un vínculo que se genera entre el cliente y el servidor, la data se guarda en el servidor pero en el cliente queda almacenado el sessionId. 

//El memory storage es el espacio de memoria volatil que tiene el servidor para almacenar la sesión. Si el servidor cae o se reinicia, se pierden las sesiones. 

//Recuerden que pueden instalar cookie-parser: npm i cookie-parser

//Para gestionar sessions tenemos que instalar:npm i express-session

//Vamos a lograr la persistencia de las sessions con File Store: 
//1) Instalamos: npm i session-file-store
//2) Importamos el modulo. 
//3) Lo inicializamos conectandonos a la session. 

//Despues de ver las desventajas de trabajar con File Storage, lo hacemos con MongoDB. 

//1) instalamos: npm i connect-mongo
//2) Importamos MongoStore: 
//const MongoStore = require("connect-mongo");


const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store");
//No se olviden de inicializarlo!:
const fileStore = FileStore(session);
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
const app = express(); 
const PUERTO = 8080;
require("../database.js");

//Middleware
app.use(express.json()); 
app.use(cookieParser());
app.use(session({
    //1) Creamos una sesion con Memory Storage: 
    secret:"secretCoder",
    //Es el valor para firmar la cookie. 
    resave: true, 
    //Esta config me permite mantener la sesión activa frente a la inactividad del usuario. 
    saveUninitialized:true,
    //Me permite guardar cualquier sesión aun cuando el objeto de sesión no tenga nada para contener. 


    //2) Utilizando File Storage:
    //store: new fileStore({path:"./src/sessions", ttl: 15, retries: 1}),
    //path: la ruta de donde se van a guardar los archivitos de sesión. 
    //ttl: Time To Live (en segundos va!)
    //retries: cantidad de vecesque el servidor tratara de leer el archivo. 

    //3) Utilizando Mongo Storage: 

    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse50015:coderhouse@cluster0.gbtlnu1.mongodb.net/ecommerce?retryWrites=true&w=majority", ttl: 100
    })

}))

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);


//Rutas de repasito de cukis: 

app.get("/crearcuki", (req, res) => {
    res.cookie("cuki", "Esto es una cukiii").send("Cuki creada!");
})


app.get("/borrarcuki", (req, res) => {
    res.clearCookie("cuki").send("Cuki borrada!");
})

//Login de usuario con Session: 

app.get("/login", (req, res) => {
    let usuario = req.query.usuario; 

    req.session.usuario = usuario; 
    res.send("Guardamos el usuario por medio de query");
})

//Verificamos el usuario:

app.get("/usuario", (req, res) => {
    if(req.session.usuario) {
        return res.send(`El usuario registrado es el siguiente: ${req.session.usuario} `);
    }
    res.send("No tenemos un usuario registrado, vamos a morir");
})




app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
});