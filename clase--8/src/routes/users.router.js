const express = require("express"); 
const router = express.Router(); 

//Array para almacenar usuarios. 
const users = []; 

//Routes

router.get("/", (req, res) => {
    res.json(users); 
})

router.post("/", (req, res) => {
    const nuevoUsuario = req.body; 
    users.push(nuevoUsuario); 
    res.send({status: "success", message: "Usuario creado correctamente"}); 
})

//Ejemplo de middleware a nivel de endpoint: 

function middleware(req, res, next) {
    console.log("Middleware de nivel de endpoint"); 
    next(); 
}

router.get("/middleware", middleware,  (req, res) => {
    res.send("Middleware a nivel de endpoint"); 
})


module.exports = router;