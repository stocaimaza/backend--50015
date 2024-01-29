const express = require("express");
const router = express.Router(); 
const fs = require("fs").promises;
const path = require("path");

const ImagenModel = require("../models/image.js");

//Routes

//A la raiz de la aplicacion, vamos a mostrar aca  tambien las imagenes que estan cargadas en el sistema
router.get("/", async (req, res) => {
    const imagenes = await ImagenModel.find();

    const nuevoArrayImagenes = imagenes.map(imagen => {
        return {
            id: imagen._id,
            title:imagen.title,
            description: imagen.description,
            filename: imagen.filename,
            path: imagen.path
        }
    })

    res.render("index", {imagenes: nuevoArrayImagenes} );
})

//Ruta para acceder al formulario para cargar imagenes: 

router.get("/upload", (req, res) => {

    res.render("upload");
})

//Ruta para enviar el formulario

router.post("/upload", async (req, res) => {
    const imagen = new ImagenModel();
    imagen.title = req.body.title;
    imagen.description = req.body.description;
    imagen.filename = req.file.filename;
    imagen.path = "/img/" + req.file.filename;

    //Guardo en la base de datos: 
    await imagen.save()

    // res.send("Se subio ok!");
    res.redirect("/");
})

//Creamos una ruta para eliminar la imagen: 

router.get("/image/:id/delete", async(req, res) => {
    const {id} = req.params;
    //Borramos de la BD y me guardo una referencia
    const imagen = await ImagenModel.findByIdAndDelete(id);
    //Borro la img fisicamente
    await fs.unlink(path.resolve("./src/public" + imagen.path));
    res.redirect("/");
})

module.exports = router; 