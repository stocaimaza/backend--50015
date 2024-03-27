const userRepository = require("../repositories/userRepository.js");

async function getAllUsers(req, res) {
    try {
        const usuarios = await userRepository.getAllUsers();
        res.json(usuarios);
    } catch (error) {
        res.status(500).send("Error");
    }
}


async function getUserById(req, res) {
    const userID = req.params.id; 
    try {
        const usuario = await userRepository.getUserById(userID);
        if(!usuario) {
            res.status(404).send("Usuario no encontrado");
        } else {
            res.json(usuario);
        }
    } catch (error) {
        res.status(500).send("Error");
    }
}


async function createUser(req, res) {
    try {
        const nuevoUsuario = req.body; 
        const creamosUsuario = await userRepository.createUser(nuevoUsuario);
        res.status(201).json(creamosUsuario);
    } catch (error) {
        res.status(500).send("Error");
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser
}