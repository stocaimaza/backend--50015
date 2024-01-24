/** CLASE 14 - MONGOOSE **/

//Temas de hoy: 

//1) Clientes de base de datos. 
//2) MongoDB Atlas
//3) DBaas (Database as a service)
//4) Configuración e instalación
//5) Mongoose  ODM (Object Document Mapping)

//Instalamos mongoose: npm install mongoose

//Preparamos nuestro servidor con express: 

const express = require("express");
const app = express();
const PUERTO = 8080;
const clientesRouter = require("./routes/clientes.router.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routing
app.use("/clientes", clientesRouter);

////////////////////////////////////

//Nos conectamos con Mongoose: 

const mongoose = require("mongoose");

//NO SE OLVIDEN DE USAR SUS DATOS: 
mongoose.connect("mongodb+srv://tinkiwinki:coderhouse@cluster0.fltoxha.mongodb.net/e-commerce?retryWrites=true&w=majority")
    .then(() => console.log("Conectados a la base de datos"))
    .catch((error) => console.log(error))

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO} `);
})

