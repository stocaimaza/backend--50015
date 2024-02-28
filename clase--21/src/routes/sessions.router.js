const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { isValidPassword } = require("../utils/hashBcrypt.js");
const passport = require("passport");
const generateToken = require("../utils/jsonwebtoken.js");


//Login con JSON Web Token: 

router.post("/login", async (req, res) => {
    const {email, password} = req.body; 
    try {
        const usuario = await UserModel.findOne({email:email});

        if(!usuario) {
            return res.status(400).send({status:"error", message: "Y ese usuario de donde salio?"});
        }

        if(!isValidPassword(password, usuario)){
            return res.status(400).send({status: "error", message: "Credenciales invalidas"});
        }

        //Si la contraseña es correcta, generamos el token. 
        const token = generateToken({
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            email: usuario.email,
            id: usuario._id
        });

        res.send({status:"success", token});
        
    } catch (error) {
        console.log("Error en al autenticación", error);
        res.status(500).send({status: "error", message: "Error interno del servidor"});
    }
})




//Logout
/*
router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

/////////////////////////////////////////////

//VERSION CON PASSPORT: 

router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/faillogin"}), async (req, res) => {
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

router.get("/faillogin", async (req, res ) => {
    console.log("Fallo la estrategia, revisate el codigo porque vamos a morir")
    res.send({error: "fallo todooo"});
})


///VERSION PARA GITHUB: 

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req, res) => {})

router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async (req, res) => {
    //La estrategía de github nos retornará el usuario, entonces lo agregamos a nuestro objeto de session. 
    req.session.user = req.user; 
    req.session.login = true; 
    res.redirect("/profile");
})
*/

module.exports = router;