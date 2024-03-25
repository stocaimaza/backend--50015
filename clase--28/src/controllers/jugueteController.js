///////////////////////////////////////////////////////////////////////////////
//CON DAO: 

//Con MongoDB: 
//const MongoDBJugueteDAO = require("../dao/mongoDBJugueteDAO.js");

//Con Memoria: 
//const MemoryJugueteDAO = require("../dao/memoryJugueteDAO.js");

//con File System: 
//const FileSystemJugueteDAO = require("../dao/fileSystemJugueteDAO.js");

//const jugueteService = new MongoDBJugueteDAO();
//const jugueteService = new MemoryJugueteDAO();
//const jugueteService = new FileSystemJugueteDAO();
///////////////////////////////////////////////////////////////////////////////
//CON FACTORY: 

const DAOFactory = require("../dao/factory.js");
const daoFactory = new DAOFactory();

//Importamos el DTO: 
const JugueteDTO = require("../dto/juguetes.dto.js");

class JugueteController {

    async crearJuguete(req, res) {
        try {
            const {nombre, categoria, precio} = req.body;
           
            //Creamos un nuevo JugueteDTO sin necesidad de pasar el fullname: 
            const jugueteDTO = new JugueteDTO(nombre, categoria, precio);
           
            //Pasamos jugueteDTO al DAO para su creación: 
            const juguete = await daoFactory.crearJuguete(jugueteDTO);
            return res.json(juguete);

        } catch (error) {
            res.status(500).json({error: "Error del servidor"})
        }
    }

    async obtenerJuguetes(req, res) {
        try {
            const juguetes = await daoFactory.obtenerJuguetes();
            res.json(juguetes);
        } catch (error) {
            res.status(500).json({error: "Error del servidor"})
        }
    }
}


module.exports = JugueteController;