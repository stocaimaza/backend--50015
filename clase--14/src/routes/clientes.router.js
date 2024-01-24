const express = require("express");
const router = express.Router();

//Importamos el modelo: 
const clientesModel = require("../models/clientes.model.js");

//Rutas: 

//1) Obtener todos los clientes: 

router.get("/", async (req, res) => {
    try {
        const clientes = await clientesModel.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({message: "Error en el servidor, vamos a morir"});
    }
})

//2) Subimos un nuevo cliente por postman

router.post("/", async(req, res) => {
    try {
        const cliente = new clientesModel(req.body); 
        await cliente.save();
        res.send({resultado: "success", cliente: cliente});
    } catch (error) {
        res.status(500).json({message: "Error en el servidor, vamos a morir"});
    }

})


module.exports = router; 