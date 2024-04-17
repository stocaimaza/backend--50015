const winston = require("winston");

// const logger = winston.createLogger({
//     //Le paso un objeto de configuración. 

//     transports: [
//         new winston.transports.Console({level:"error"}),
//         //Agregamos un nuevo transporte: 
//         new winston.transports.File({
//             filename: "./errors.log",
//             level: "warn",
//         })
//     ]
// })

///////////////////////////////////////////////

//Ejemplo configurando nuestros propios niveles: 

const niveles = {
    nivel: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colores: {
        fatal: "red",
        error: "yellow",
        warning: "blue",
        info: "green",
        http: "magenta",
        debug: "white"
    }
}

const logger = winston.createLogger({
    levels: niveles.nivel,
    transports: [
        new winston.transports.Console({
            level: "http", 
            format: winston.format.combine(
                winston.format.colorize({colors: niveles.colores}), 
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "./errores.log", 
            level: "warning",
            format: winston.format.simple()
        })
    ]
})


//Creamos un middleware: 

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`);
    next();
}

module.exports = addLogger;