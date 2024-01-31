const mongoose = require("mongoose");

const alumnoSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        index: true
    },
    apellido: String,
    email: {
        type: String,
        unique: true, 
        required: true
    },
    edad: Number,
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cursos"
    }]
})

//Middleware PRE de Mongoose: 

alumnoSchema.pre("findOne", function(next){
    this.populate("cursos");
    next();
})

const alumnoModel = mongoose.model("alumnos", alumnoSchema);

module.exports = alumnoModel;