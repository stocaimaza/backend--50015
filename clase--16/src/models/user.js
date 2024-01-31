const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        // index:true
    }, 
    apellido: String,
    email: {
        type: String, 
        unique: true, 
        required: true
    },
    edad : {
        type: Number,
        index: true
    }
})

const userModel = mongoose.model("usuarios", userSchema);

module.exports = userModel;

//Otros tipos de indices: 

//1) Llave multiple: 
// ,
// cursos: {
//     type: Array, 
//     index:true;
// }

