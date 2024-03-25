const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://coderhouse50015:coderhouse@cluster0.gbtlnu1.mongodb.net/Jugueteria?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conexióne exitosa"))
    .catch( error => console.log("Error: ", error))