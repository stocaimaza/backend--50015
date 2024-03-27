/** REPOSITORY Y SERVIDOR POR CAPAS **/


const express = require("express");
const app = express(); 
const PUERTO = 8080;
require("./database.js");
const usuariosRouter = require("./routes/usuarioRouter.js");

//Middleware
app.use(express.json());

//Rutas

app.use("/usuarios", usuariosRouter);

//Listen

app.listen(PUERTO);