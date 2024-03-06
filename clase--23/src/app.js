/** CLASE 23 - RUTEO AVANZADO **/

//Temas de hoy: 

//1) Expresiones regulares
//2) Restringiendo parámetros
//3) Validando parámetros
//4) Custom Router
//5) Custom Response

//1) Expresiones regulares: son herramientas que nos permiten validar diferentes patrones en algunas cadenas de texto. 
//Por ejemplo: validar si el texto ingresado por el usuario corresponde a un email: "nombre@dominio.com"

//Ejemplo con correo electrónico: 

let correoIngresado = "lionel@messi.com"; 
let correoFalso = "tinkiwinki";

const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(patronCorreo.test(correoIngresado));
console.log(patronCorreo.test(correoFalso));

//Ejemplo número de telefono: 

//Esperamos este formato: (xxx) xxx-xxxx

const patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;
let telefonoIngresado = "(223) 669-1111";

console.log("Verificamos un tel: " + patronTelefono.test(telefonoIngresado));


//2) Restringiendo parámetros: 
//Vemos que pasa cuando queremos trabajar con rutas y esperamos parámetros del usuario. 

const express = require("express");
const app = express();
const PUERTO = 8080; 
const clientesRouter = require("./routes/clientes.router.js");

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

//Rutas
app.use("/clientes", clientesRouter);

//////////////////////////////////////////////////////////////
//Nos conectamos con este "nuevo" router utilizando el middleware de router habitual, solo que tenemos que instanciarlo antes. 

const UserRouter = require("./routes/users.router.js");
const userRouter = new UserRouter();
app.use("/users", userRouter.getRouter());

//////////////////////////////////////////////////////////////

//¿Que hacer con todas las rutas que no coinciden con ningún endpoint?

// app.get("*", (req, res) => {
//     res.status(404).send({message: "Recurso no encontrado"}); 
// })

app.listen(PUERTO, () => console.log("Escuchando en el Puerto de Mar del Plata")); 