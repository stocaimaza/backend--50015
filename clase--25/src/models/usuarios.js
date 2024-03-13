const mongoose = require("mongoose"); 

const userSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    legajo: Number
})

const UserModel = mongoose.model("usuarios", userSchema);

module.exports = UserModel;