/** CLASE 32 - OPTIMIZACIÓN **/

//1) COMPRESIÓN 
//2) MANEJO PERSONALIZADO DE ERRORES

////////////////////////////////////////////////////////////////////////////////////


const express = require("express");
const app = express(); 
const PUERTO = 8080;
const usuariosRouter = require("./routes/usuarios.router.js");
const manejadorError = require("./middleware/error.js");

//Lo importamos: 
// const compression = require("express-compression");

//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(compression({
//     brotli: {
//         enabled: true,
//         zlib: {}
//     }
// }));


//Rutas

// app.get("/", (req, res) => {
//     let string = "Hola comisión, somos programadores y no sabemos arreglar impresoras";

//     for (let i = 0; i < 5e4; i++) {
//         string += "Hola comisión, somos programadores y no sabemos arreglar impresoras";
//     }
//     res.send(string);
// })


app.use("/usuarios", usuariosRouter);
app.use(manejadorError);
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})

//Sin compresión, 3.4 mb
//Con compresión, 11.9 kb
//Con brotli, 357 bytes

//Middleware para el manejo de errores: 
//Vamos a desarrollar nuestra propia gestión interna de errores. 
//Y para lograr esto necesitamos 3 cosas: 

//1) Un middleware de recepción de errores. 
//2) Un generador personalizado de errores. 
//3) Un diccionario de errores. 