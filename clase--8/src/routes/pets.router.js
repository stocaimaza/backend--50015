const express = require("express"); 
const router = express.Router(); 

//Array para almacenar mascotas. 
const pets = []; 

//Routes: 

router.get("/", (req, res) => {
    res.json(pets);
})

router.post("/", (req, res) => {
    const nuevoMascota = req.body; 
    pets.push(nuevoMascota); 
    res.send({status: "success", message: "Mascota creada correctamente"});
})

module.exports = router; 