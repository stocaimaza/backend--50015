const Router = require("./router.js"); 

class UserRouter extends Router {
    init() {
        //Acá colocamos todas nuestra rutas: 
        this.get("/", (req, res) => {
            //res.send("Get de usuarios");
            res.sendSuccess("Hola alumnos, viva dormir la siesta");
        });


        this.post("/", (req, res) => {
            res.send("post de usuarios");
        });
    }
}


module.exports = UserRouter
