/** CLASE 27 - ARQUITECTURA DEL SERVIDOR: DISEÑO **/

//Temas de hoy: 

//1) Punto de partida al desarrollar un servidor. 
//2) Patrones de diseño. 
//3) Singleton para nuestra conexión con MongoDB
//4) Comunicación entre el front y el backend. 


//////////////////////////////////////////////////////

const express = require("express");
const app = express();
const PUERTO = 8080;
const cors = require("cors");
const productosRouter = require("./routes/productos.router.js");
require("./database.js");


//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));
app.use(cors());

//Rutas

app.use("/productos", productosRouter);

app.listen(PUERTO);