//4) Creando un Custom Router. 

//A medida que el proyecto y el equipo de desarrolloavancen vamos a tener que pulir nuestro proyecto pra que este pueda escalar. 
//Una buena idea es crear nuestro propio "Router", a partir del router de express. 

//Dos grandes ventajas: 

//1) Manejo sistematizado de respuestas: al personalizar el router, podemos definir formatos de respuesta en el objeto res. 

//2) Gestión de middleware interiorizada: cuando usamos app.use(middleware) a nivel de aplicación, se aplica a todos los enpoints. Al personalizar el router, podemos dinamizar el uso de middlewares a nivel del router. 

//PROCESO DE CREACIÓN: 

const express = require("express");
const router = express.Router();

class Router {
    constructor() {
        this.router = router; 
        this.init();
    }

    getRouter() {
        return this.router; 
        //Devuelve el objeto router. 
        
    }

    get(path,  ...callbacks){
        //Definir una ruta get en el router
        //El primer argumento es la ruta
        //Los siguientes argumentos son los callbacks que se ejecutaran cuando se haga GET a esta ruta determinada. 
        this.router.get(path,  this.generateCustomResponse, this.applyCallbacks(callbacks));
    }

    post(path,  ...callbacks){
        this.router.post(path, this.generateCustomResponse, this.applyCallbacks(callbacks));
    }


    applyCallbacks(callbacks){
        //Aplicar los callbacks a la ruta
        //Para lograr esto vamos a crear una función async que envuelve cada callback proporcionado
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this,params);
            } catch (error) {
                console.log(error);
                params[1].status(500).send(error);
            }
        })
    }

    //Custom responses: 
    generateCustomResponse(req, res, next) {
        res.sendSuccess = payload => res.send({status: "success", payload});
        res.sendServerError = error => res.status(500).send({status:"error", error}); 
        res.sendUserError = error => res.status(400).send({status:"error", error}); 
        next();
    }
}


module.exports = Router;