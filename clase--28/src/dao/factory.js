const config = require("../config/config.js");

let DAO; 

switch(config.persistencia){
    case "mongo":
        DAO = require("./mongoDBJugueteDAO.js");
        break;
    case "memory":
        DAO = require("./memoryJugueteDAO.js");
        break;
    case "file":
        DAO = require("./fileSystemJugueteDAO.js");
        break;
    default: 
        throw new Error("Persistencia no valida, moriras en 7 dias. ");
}

module.exports = DAO; 