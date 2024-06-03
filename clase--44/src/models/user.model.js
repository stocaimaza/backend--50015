const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },

    password: {
        type: String,
        //required: true
    },

    age: {
        type: Number,
        required: true
    },

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },

    role: {
        type: String,
        enum: ['admin', 'usuario', 'premium'],
        default: 'usuario'
    },

    resetToken: {
        token: String,
        expiresAt: Date
    },

    documents: [{
        name: String,
        reference: String
    }],

    last_connection: {
        type: Date,
        default: Date.now
    }
});

//Cuarta integradora: 
// Modificar el modelo de User para que cuente con una nueva propiedad “documents” el cual será un array que contenga los objetos con las siguientes propiedades name: String (Nombre del documento). reference: String (link al documento).
// No es necesario crear un nuevo modelo de Mongoose para éste.
// Además, agregar una propiedad al usuario llamada “last_connection”, la cual deberá modificarse cada vez que el usuario realice un proceso de login y logout


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
