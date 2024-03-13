const dotenv = require("dotenv");

//const entorno = "desarrollo"; 
//De esta forma lo hacemos a manopla. 

//Pero tambien lo puedo tomar de los argumentos configurados
const program = require("../utils/commander.js");

const {mode} = program.opts();

dotenv.config({
    // path: entorno === "produccion"?"./.env.produccion":"./.env.desarrollo" // Este es el modo manopla
    path: mode === "produccion"?"./.env.produccion":"./.env.desarrollo"
});

const configObject = {
    puerto: process.env.PUERTO,
    mongo_url:process.env.MONGO_URL
}

module.exports = configObject;
