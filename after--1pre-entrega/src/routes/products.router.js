const express = require("express");
const router = express.Router(); 

const ProductManager = require("../controllers/product-manager.js"); 
const productManager = new ProductManager("./src/models/productos.json");


//Rutas: 


router.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }
    } catch (error) {

        console.error("Error al obtener productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})


router.get("/products/:pid", async (req, res) => {
    
    const id = req.params.pid;

    try {
        
        const producto = await productManager.getProductById(parseInt(id)); 
        if (!producto) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

module.exports = router; 
