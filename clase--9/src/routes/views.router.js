const express = require("express"); 
const router = express.Router(); 

//Array de productos: 
const arrayProductos = [
    {nombre: "Fideos", descripcion: "Los mas ricos", precio: 100},
    {nombre: "Arroz", descripcion: "El que no se pasa", precio: 100},
    {nombre: "Helado", descripcion: "Mas frio que el corazon de tu ex", precio: 100}
]

//Desarrollamos la ruta: 

router.get("/", (req, res) => {
    const usuario = {
        nombre: "Tinki", 
        apellido: "Winki",
        mayorEdad: true, 
    }

    res.render("index", { usuario, arrayProductos, titulo: "Plantillita", style:"style.css"});
})

router.get("/contacto", (req, res) => {
    res.render("contacto", {titulo: "Plantillita"});
})

module.exports = router;