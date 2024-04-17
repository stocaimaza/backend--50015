const mongoose = require("mongoose");

mongoose.connect("tubd")
    .then( () => console.log("Conectado a la BD"))
    .catch( (error) => console.log(error))