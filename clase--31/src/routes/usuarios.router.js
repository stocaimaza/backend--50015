const express = require("express");
const router = express.Router(); 
const generarUsuarios = require("../utils/util.js");

router.get("/", (req, res) => {
    //Generamos un array de usuarios: 
    const usuarios = [];

    for ( let i = 0; i < 100; i++ ){
        usuarios.push(generarUsuarios());
    }
    res.json(usuarios);
})

module.exports = router;