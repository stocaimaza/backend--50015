/** CLASE 22 -- PASSPORT AVANZADO **/

//Recordemos: JsonWebToken es una implementación SIN ESTADO que me permite mantener el ciclo de vida de la sesión del usuario.

//¿Cómo funciona? 

//1) El servidor genera un token y se lo envia al cliente (navegador)
//2) El navegador almacena ese token y lo envia en cada request por medio de los HEADERS. 
//3) El servidor recibe las peticiones, busca el token de JWT en los headers, si lo encuentra podra proceder, sino pide autenticación. 

//DIFERENTES FORMAS DE ENVIAR JWT: 

const express = require("express");
const app = express();
const PUERTO = 8080;
const cookieParser = require("cookie-parser"); 
const passport = require("passport");
const jwt = require("jsonwebtoken");
const initializePassport = require("./config/passport.config.js")
const {passportCall, authorization} = require("./utils/util.js")


//Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

//Rutas 

app.post("/login", (req, res) => {
    let {usuario, pass} = req.body;
    if(usuario === "tinki" && pass === "winki") {
        //let token = jwt.sign({usuario, pass}, "coderhouse", {expiresIn: "24h"});
        //res.send({message: "Login exitoso", token} );

        //Enviar token desde Cookie: 
        //res.cookie("coderCookieToken", token, {maxAge: 60*60*1000, httpOnly: true}).send({message:"login exitoso!!"});

        /////////////////////////////////////////////////////
        //Modificación para utilizar el middleware "authorization":
        let token = jwt.sign({usuario, pass, role:"user"}, "coderhouse", {expiresIn: "24h"});
        res.cookie("coderCookieToken", token, {maxAge: 60*60*1000, httpOnly: true}).send({message:"login exitoso!!"});
        /////////////////////////////////////////////////////


        //60*60*1000 representa una hora en milisegundos
        //La opción httpOnly es una medida de seguridad que indica que la cookie solo sepuede acceder a traves del protocolo HTTP y no mediante JS en el navegador. 
        //"no te larga la cookie a menos que sea por una petición" (aporte de Mati)

    } else {
        res.send({message: "Login fallido"});
    }
})

//Creamos la ruta current: 

// app.get("/current", passport.authenticate("jwt", {session:false}),(req, res) => {
//     res.send(req.user)
// })

//Usamos PassportCall: 

app.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
    res.send(req.user)
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})

//instalamos: npm install passport passport-jwt