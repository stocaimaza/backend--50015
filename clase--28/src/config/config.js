require("dotenv").config();

const config = {
    persistencia: process.env.PERSISTENCIA || "mongo"
    //Mongo es la opción por defecto
};

module.exports = config; 