const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/coderest")
    .then(() => console.log("Conectado a MongoDB"))
    .catch(error => console.log(error))

