const {Command} = require("commander");
const program = new Command(); 

program
    .option("--mode <mode>", "modo de trabajo", "produccion")
program.parse();


module.exports = program;