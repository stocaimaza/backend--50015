/** CLASE 17 - MONGODB AVANZADO 2 **/

//1) Aggregations
//2) Paginacion

////////////////////////// AGGREGATIONS //////////////////////////

//Es un proceso que consiste en realizar múltiples operaciones en una sola consulta. 
//Estas operaciones pueden ser de cualquier tipo, consulta de datos, filtros, ordenamientos, proyecciones, modificaciones, etc. 

/*Ejercicio : Pizzeria el Codigo Loco*/

const mongoose = require("mongoose");
const OrderModel = require("./models/order.js");

const main =  async () => {
    mongoose.connect("mongodb+srv://coderhouse50015:coderhouse@cluster0.gbtlnu1.mongodb.net/Pizza?retryWrites=true&w=majority");

    //Ejercicio 1: Nos pide que calculemos el total de pizzas vendidas por sabores pero solo en tamaño familiar. 

    // const resultado = await OrderModel.aggregate([
    //     {
    //         $match: {
    //             tam: "familiar"
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: "$nombre",
    //             total: {
    //                 $sum: "$cantidad"
    //             }
    //         }
    //     },
    //     //Ejercicio 2: 
    //     //Ordenamos:
    //     {
    //         $sort: {
    //             total: -1
    //             //1: Ascendente
    //             //-1: Descendente
    //         }
    //     },
    //     //Guardamos los resultados en una nueva coleccion llamada "reports": 
    //     {
    //         $group: {
    //             _id: 1, 
    //             orders: {
    //                 //Si quiero que los resultados se guarden en un array puedo usar $push:
    //                 $push: "$$ROOT"
    //                 //ROOT hace referencia al documento actual. 
    //             }
    //         }
    //     },
    //     //Una vez que agrupamos los resultados, los guardamos en la colección: 
    //     {
    //         $project: {
    //             "_id":0,
    //             orders: "$orders"
    //             //Acá le decimos que el campo "orders" va a ser igual a los resultados que guardamos en el paso anterior. 
    //         }
    //     }, 
    //     //Ultimo paso super importante, hacemos el merge: 
    //     {
    //         $merge: {
    //             into: "reports"
    //         }
    //     }
    // ])

    //Paginacion: 
    //Tambien le puedo agregar un limite de resultados por pagina: 
    // const resultado = await OrderModel.paginate({"tam":"familiar"}, {limit: 2, page: 2});
    // console.log(resultado);
};

main();

//////////////////////// PAGINACION ///////////////////////////
//Es un proceso que consiste en dividir los resultados de una consulta en bloques de datos. 

//Instalamos: npm install mongoose-paginate-v2
//Usamos el metodo plugin en el order.js

const express = require("express");
const app = express();
const PUERTO = 8080; 
const exphbs = require("express-handlebars");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/pizzas", async (req, res) => {
    const page = req.query.page || 1;
    const limit = 2; 

    try {
        const pizzasListado = await OrderModel.paginate({}, {limit, page})

        const pizzasResultadoFinal = pizzasListado.docs.map(pizza => {
            const {_id, ...rest} = pizza.toObject();
            return rest;
        })
        

        res.render("pizzas", {
            pizzas: pizzasResultadoFinal,
            hasPrevPage: pizzasListado.hasPrevPage,
            hasNextPage: pizzasListado.hasNextPage,
            prevPage: pizzasListado.prevPage, 
            nextPage: pizzasListado.nextPage,
            currentPage: pizzasListado.page,
            totalPages: pizzasListado.totalPages
        });
    } catch (error) {
        console.log("Error en la paginacion ", error); 
        res.status(500).send("Error fatal en el server");
    }
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO} `);
})