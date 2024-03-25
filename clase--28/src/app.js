/** SERVIDOR - MODELO DE CAPAS **/

//Ejercicio Jugueteria

const express = require("express");
const app = express();
const PUERTO = 8080; 
require("./database.js");
const juguetesRouter = require("./routes/juguetes.router.js");


//Middleware 
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

//Rutas 
app.use("/juguetes", juguetesRouter);

//Listen

app.listen(PUERTO, () => {
    console.log(`Escuchando el Puerto: ${PUERTO}`);
})
