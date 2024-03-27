const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://coderhouse50015:coderhouse@cluster0.gbtlnu1.mongodb.net/produccion?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la BD"))
    .catch((error) => console.log("Si te llega este mensaje llueve todo el fin de semana largo", error))

