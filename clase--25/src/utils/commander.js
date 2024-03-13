//3) Procesamiento de Argumentos con Commander. 

const {Command} = require("commander");
const program = new Command();


//1 - Comando // 2 - La descripcion // 3 - Valor por default
program
    .option("-p <port>", "puerto en donde se inicia el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "produccion")
program.parse();
//Finalizamos acá la configuración. 

//Verificamos que esto funciona: 
//console.log("Opciones :", program.opts());

module.exports = program; 