const UserModel = require("../models/usuarios.js");

class UserRepository {
    async getAllUsers() {
        try {
            const usuarios = await UserModel.find();
            return usuarios; 
        } catch (error) {
            throw new Error("Error al obtener todos los usuarios")
        }
    }

    async getUserById(userId) {
        try {
            const usuario = await UserModel.findById(userId);
            return usuario; 
        } catch (error) {
            throw new Error("Error al obtener el usuario por ID");
        }
    }

    async createUser(userData) {
        try {
            const nuevoUsuario = await UserModel.create(userData);
            return nuevoUsuario;
        } catch (error) {
            throw new Error("Error al crear nuevo usuario");
        }

    }
}

module.exports = new UserRepository();