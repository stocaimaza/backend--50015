const express = require("express");
const router = express.Router(); 
const usuariosController = require("../controller/usuarioController.js");

router.get("/", usuariosController.getAllUsers);
router.post("/", usuariosController.createUser);
router.get("/:id", usuariosController.getUserById);

module.exports = router; 