const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://coderhouse50015:coderhouse@cluster0.gbtlnu1.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexion Exitosa"))
    .catch(() => console.log("Fallo todo vamos a morir"))