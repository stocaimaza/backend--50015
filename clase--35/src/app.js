/**  CLASE 35 - CLUSTERIZACION Y ESCALABILIDAD **/

//Temas de hoy: 

//Escalabilidad. 
//Clusterizar nuestra App. 
//Contenedores
//Instalamos Docker Desktop 

//////////////////////////////////////////////////////////////

//¿Se acuerdan del objeto Process?
console.log(process.pid);
//Esta propiedad me retorna el identificador del proceso. 

//Nota: al proceso principal ahora lo vamos a llamar Primary Process (guarda, no le digan más Master), mientras que a los procesos hijos o instancias los vamos a llamar "workers".

//Módulo Nativo Cluster: Es un módulo de Node JS que nos permite ejecutar este concepto de clusterizacion que recien comentamos, en donde tenemos un proceso principal con un grupo de procesos trabajadores. 

const express = require("express");
// const app = express();
// const PUERTO = 8080;


// app.get("/operacionsimple", (req, res) => {
//     let suma = 0;
//     for (let i = 0; i < 1000000; i++) {
//         suma += i;
//     }
//     res.send({suma});
// })

// app.get("/operacioncompleja", (req, res) => {
//     let suma = 0;
//     for (let i = 0; i < 5e8; i++) {
//         suma += i;
//     }
//     res.send({suma});
// })

// app.listen(PUERTO, () => {
//     console.log(`Escuchando en el puerto ${PUERTO}`);
// })

const cluster = require("cluster");
const { cpus } = require("os");
const numeroDeProcesadores = cpus().length;
//console.log("Numero de procesadores:", numeroDeProcesadores);

if (cluster.isPrimary) {
    console.log("Es un proceso primario");
    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork();
    }
    cluster.on("message", worker => {
        console.log(`Mensaje recibido desde el worker: ${worker.process.pid}`);
    })
} else {
    console.log(`Me presento, soy un proceso worker con el id ${process.pid} `);
    const app = express();
    const PUERTO = 8080;


    app.get("/operacionsimple", (req, res) => {
        let suma = 0;
        for (let i = 0; i < 1000000; i++) {
            suma += i;
        }
        res.send({ suma });
    })

    app.get("/operacioncompleja", (req, res) => {
        let suma = 0;
        for (let i = 0; i < 5e8; i++) {
            suma += i;
        }
        res.send({ suma });
    })

    app.listen(PUERTO, () => {
        console.log(`Escuchando en el puerto ${PUERTO}`);
    })
}


//Test de Artillery: 

//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json
//Se completaron con exito las 2000 request y en tiempos minimo de 5 y max 449


///

//artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json
//Se completaron con exito 11 request de las 51 request. 

//Y ahora vamos a probar con las multiples instancias: 
//Se completaron con exito 680 request de las 708 request. 

