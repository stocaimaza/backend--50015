const express = require("express");
const router = express.Router();
const JugueteController = require("../controllers/jugueteController.js");
const jugueteController = new JugueteController();

//Rutas

//1) Nos vinculamos con el controlador y trabajamos la ruta post y get: 

router.get("/", jugueteController.obtenerJuguetes);
router.post("/", jugueteController.crearJuguete);

module.exports = router;