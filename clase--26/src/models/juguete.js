const mongoose = require("mongoose");

const jugueteSchema = new mongoose.Schema({
    nombre: String, 
    categoria: String,
    precio: Number
});

const JuguetesModel = mongoose.model("juguetes", jugueteSchema);

module.exports = JuguetesModel;