const mongoose = require("mongoose");

const jugueteSchema = new mongoose.Schema({
    nombre: String, 
    categoria: String,
    fullname: {
        type:String,
        required: true
    },
    precio: Number
});

const JuguetesModel = mongoose.model("juguetes", jugueteSchema);

module.exports = JuguetesModel;