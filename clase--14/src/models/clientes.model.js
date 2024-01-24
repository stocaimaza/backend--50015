//Importamos mongoose: 
const mongoose = require("mongoose"); 

//Definimos una constante con el nombre de la colección

const clientesCollection = "clientes";

//Definimos el esquema: "schema"
//El "schema" es un objeto que nos permite definir la forma de los documentos. Configuramos el nombre de los campos y los tipos de datos que almacenarán. 

const clientesSchema = new mongoose.Schema({
    nombre:String,
    apellido:String,
    edad:Number
});

//Definimos el modelo: 

const clientesModel = mongoose.model(clientesCollection, clientesSchema);

//Exportamos el modelo: 

module.exports = clientesModel;

