const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { createHash } = require("../utils/hashBcrypt.js");
const passport = require("passport");



//Post para generar un usuario y almacenarlo en MongoDB
/*
router.post("/", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        // Verificar si el correo electrónico ya está registrado
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ error: "El correo electrónico ya está registrado" });
        }

        // Crear un nuevo usuario
        const newUser = await UserModel.create({ first_name, last_name, email, password:createHash(password), age });

        // Almacenar información del usuario en la sesión (puedes ajustarlo según tus necesidades)
        req.session.login = true;
        // req.session.user = {
        //     email: newUser.email,
        //     age: newUser.age
        // }; //Mejor hacer esto: 
        req.session.user = { ...newUser._doc };

        res.status(200).send({ message: "Usuario creado con éxito" });
        
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});
*/

///VERSION PARA PASSPORT: 

router.post("/", passport.authenticate("register", {
    failureRedirect: "/failedregister"
}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: "error", message: "Credenciales invalidas"});

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    };

    req.session.login = true;

    res.redirect("/profile");
})

router.get("/failedregister", (req, res) => {
    res.send({error: "Registro fallido"});
})

module.exports = router; 