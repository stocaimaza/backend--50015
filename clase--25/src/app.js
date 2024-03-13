/** CLASE 25 - PROCESO PRINCIPAL DEL SERVIDOR + GLOBAL & CHILD PROCESS  **/

//Temas de hoy: 

//1) Objecto process
//2) Manejo de argumentos
//3) Commander JS
//4) Manejo de variables de entorno
//5) Listeners
//6) Child Process

///////////////////////////////////////////

//Objeto Process

console.log("Bienvenidos Comision 50015!");

//cada vez que yo ejecuto en la consola: node src/app.js se crea automáticamente un objeto llamado "process", y este objeto tiene información sobre este proceso. 

//console.log(process);

//Algunos elementos importantes: 

//console.log(process.cwd());
//Me retorna el directorio actual del proceso.

//console.log(process.pid);
//Obtengo el ID del proceso en el sistema operativo. 
//Por el momento, conocer este dato no nos resulta tan importante. Peeeeeeeero  si estamos trabajando con varios procesos en una misma computadora, conocer este ID nos puede ayudar a monitorear los procesos. 

//console.log(process.memoryUsage());
//Me retorna valores en bytes. 
//Cantidad de memoria que usa el proceso. 

//Si quiero conocer la version del proceso = Node
//console.log(process.version);
//v.20.11 Node JS

//process.exit()
//Esto lo que hace es finalizar el proceso. 

//console.log("Texto adicional");
//este texto nunca se muestra si en la linea 39 tenemos process.exit();

//2) Manejo de argumentos en la consola

console.log(process.argv);

//3) Commander JS: libreria que me permite personalizar mis comandos en la consola. 

//Instalación: npm i commander

//Ejemplo: iniciamos un pequeño servidor y conectamos a MongoDB

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const UserModel = require("./models/usuarios.js");
const configObject = require("./config/config.js");

const {mongo_url, puerto} = configObject;

//Rutas
app.get("/", async (req, res) => {
    try {
        const usuarios = await UserModel.find();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send({message:"Error del servidor, vamos a morir"});
    }
})

//Iniciamos el server

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto: ${puerto} `);
})


//Conectamos con MongoDB

mongoose.connect(mongo_url)
    .then(() => console.log("Conexión exitosa") )
    .catch((error) => console.log("Vamos a morir", error))


//6) Child Process

// function operacionCompleja() {
//     let result = 0; 

//     for(let i = 0; i < 5e9; i++) {
//         result += i;
//     }

//     return result;
// }

// app.get("/suma", (req, res) => {
//     const result = operacionCompleja();
//     res.send(`El resultado de la operación es: ${result}`);
// })

//Pasitos para lograr el forkeo. 

//1) Separamos la función que trae problemas a otro modulo. 
//2) la modificamos y la dejamos disponible para cuando el padre la solicite
//3) Ejecutamos la ruta

const {fork} = require("child_process");
//No hace falta instalar nada, ya es un proceso nativo. 

app.get("/suma", (req, res) => {
    const child = fork("./src/operacionesComplejas.js") ;
    child.send("iniciando"); //Acá el proceso padre le envia un mensaje al hijo. 
    child.on("message", result => {
        res.send(`El resultado de la operacion es: ${result}`)
    })
})