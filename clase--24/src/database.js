import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/Coderest?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectado a MongoDB"))
    .catch( (error) => console.log("Tenemos un error, vamos a morir, todo es bronca y dolor", error))