/** EJERCICIO CON DOCKER **/

const express = require("express");
const app = express(); 
const PUERTO = 8080;

app.get("/", (req, res) => {
    res.send("Hola Docker, bienvenido a nuestra vida!");
})

app.get("/operacionsimple", (req, res) => {
    let suma = 0;
    for (let i = 0; i < 1000000; i++) {
        suma += i;
    }
    res.send({ suma });
})

app.get("/operacioncompleja", (req, res) => {
    let suma = 0;
    for (let i = 0; i < 5e8; i++) {
        suma += i;
    }
    res.send({ suma });
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})