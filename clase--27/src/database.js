// const mongoose = require("mongoose");
// const configObject = require("./config/config.js");
// const {mongo_url} = configObject;

// mongoose.connect(mongo_url)
//     .then(()=> console.log("Conectados a la BD"))
//     .catch((error)=> console.log("Si te llega este mensaje tenes 7 dias de vida", error))


//Patron de diseño Singleton:

//Es un patrón utilizado para tener una instancia global a nivel aplicación. 

// En ocasiones, se requiere que la aplicación tenga una única instancia de dicha clase (Por ejemplo, al abrir una conexión en base de datos). 

// El patrón singleton corrobora si ya existe una instancia de esta clase. En caso de que sí, devolverá la instancia, caso contrario creará la instancia.

const mongoose = require("mongoose");
const configObject = require("./config/config.js");
const {mongo_url} = configObject;

class BaseDatos {
    static #instancia; 

    //Se declara una variable estática y privada #instancia. La palabra clave static significa que esta variable pertenece a la clase en sí, no a las instancias individuales de la misma. 
    constructor(){
        mongoose.connect(mongo_url);
    }

    static getInstancia() {
        if(this.#instancia) {
            console.log("Conexion previa");
            return this.#instancia;
        }

        this.#instancia = new BaseDatos();
        console.log("Conexión exitosa!!");
        return this.#instancia;
    }
}

module.exports = BaseDatos.getInstancia();