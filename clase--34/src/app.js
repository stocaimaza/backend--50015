/** CLASE 34 - LOGGERS Y TESTING DE PERFORMANCE **/

//Temas de hoy

//1) Que son los loggers
//2) Winston
//3) Test de carga Artillery
//4) Modelo de Performance con Artillery

//////////////////////////////////////////////////////////

//Levantamos un servidor muy simple: 

const express = require("express");
const app = express(); 
const PUERTO = 8080; 
const addLogger = require("./utils/logger.js");

//Middleware
app.use(addLogger);

//Rutas

app.get("/", (req, res) => {
    res.send("Olis!");
})

//Testeamos un warning
app.get("/warning", (req, res) => {
    req.logger.warn("¡Cuidado! Hombre radiactivo!");
    res.send("Prueba de warning");
})

//Ruta para probar todoooo: 

app.get("/loggertest", (req, res) => {
    req.logger.error("Error fatal, vamos a morir");
    req.logger.debug("Mensaje de debug");
    req.logger.info("Mensaje de Info");
    req.logger.warning("Mensaje de Warning");

    res.send("Test de logs");
})

app.listen(PUERTO, () => {
    console.log(`Escuchando desde el puerto de Mar del Plata`);
})

//Artillery: es una herramienta que me permite simular múltiples peticiones de información a mi servidor, con la idea de testear su funcionamiento. 

//Si lo quieren hacer global: npm install artillery -g

//Si lo quieren instalar en modo desarrollo 

//SIMULAMOS OPERACIONES SIMPLES Y COMPLEJAS: 

app.get("/operacionsimple", (req, res) => {
    let suma = 0;
    for (let i = 0; i < 1000000; i++) {
        suma += i;
    }
    res.send({suma});
})

app.get("/operacioncompleja", (req, res) => {
    let suma = 0;
    for (let i = 0; i < 5e8; i++) {
        suma += i;
    }
    res.send({suma});
})

//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json

//artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json