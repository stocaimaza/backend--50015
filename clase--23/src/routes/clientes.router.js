const express = require("express");
const router = express.Router(); 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //En esta situación yo estoy esperando un parametro por la URL, el nombre del cliente. 

    //¿Que ocurre si el cliente ingresa solo números o caracteres espciales en lugar de palabras? 

    //Para solucionar este problema y recibir solo los parametros esperados podemos usar las expresiones regulares. 
    let cliente = req.params.cliente;
    res.send("cliente:" + cliente);
})


//Otra forma de hacerlo: 

router.get("/email/:email", (req, res) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = req.params.email;

    if(emailRegex.test(email)) {
        res.send("Email valido: " + email);
    } else {
        res.send("Email inválido");
    }
})

//3) Validando parámetros: 
//Supongamos que al crecer mi aplicación, voy a tener que generar muchas rutas que reciben el mismo parámetro. 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a obtener un recurso a partir del parámetro cliente
    res.send("obteniendo recurso para el cliente: " + req.params.cliente);
})

router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a enviar un recurso a partir del parámetro cliente
    res.send("enviando recurso para el cliente: " + req.params.cliente);
})

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a actualizar un recurso a partir del parámetro cliente
    res.send("Actualizando recurso para el cliente: " + req.params.cliente);
})

router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a eliminar un recurso a partir del parámetro cliente
    res.send("Eliminando recurso para el cliente: " + req.params.cliente);
})

//Nos encontramos que en los 4 métodos hay lineas de código que son iguales y se van a repetir: 
//a) Obtener el parámetro del cliente. 
//b) Buscar el parámetro en la base de datos. 
//c) Una vez validado, continuar con la operacion que corresponda. 

//Esto lo podemos simplificar creando un middleware llamado "router.param". 

router.param("cliente", (req, res, next, cliente) => {
    const clientes = ["firulais", "lionel", "pepe"]; 

    if(clientes.includes(cliente)){
        req.cliente = cliente;
        next();
    } else {
        res.status(404).send("Cliente no encontrado");
    }
})

module.exports = router;