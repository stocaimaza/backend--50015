//MOCK: es una imititación de un dato real. Es una simulación que generamos en el entorno de desarrollo para no manipular datos reales y para tener herramientas de trabajo de forma rápido. 
//Entonces yo a traves de un mock puedo simular de forma y simple y rápida una base de datos de usuarios, clientes, productos, etc etc. 

//FAKER-JS: 
//instalamos: npm install @faker-js/faker

const express = require("express");
const app = express(); 
const PUERTO = 8080;
const usuarioRouter = require("./routes/usuarios.router.js");

app.use("/", usuarioRouter);

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})
