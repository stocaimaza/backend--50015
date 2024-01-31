/** CLASE 16 - MONGO AVANZADO 1 **/

//1) Indexación. 
//2) Manejo de Populations en MongoDB
//3) PRE
//4) Practicamos: CRUD

/////////////////////////////////////////////////////////

//1) Indexación: es una técnica o proceso que se realiza para poder realizar consultas más rápidas.

//Esto nos permitirá tener una referencia previa al momento de buscar un documento, con el fin de evitar recorrer toda la colección, documento por documento, hasta encontrar dicho valor. 

//Esta referencia se conoce como índice y se crea a partir de uno o varios campos de un documento. Entonces la busqueda se realiza sobre el indice evitando recorrer toda la coleccion. 

//BD: Tienda / colección: usuarios

const mongoose = require("mongoose");
// const userModel = require("./models/user.js");

// const main = async() => {
//     await mongoose.connect("mongodb+srv://coderhouse50015:coderhouse@cluster0.gbtlnu1.mongodb.net/Tienda?retryWrites=true&w=majority");

//     //Analizamos los tiempos de respuesta: 

//     const respuesta = await userModel.find({edad: {$lt:19}}).explain("executionStats")
//     console.log(respuesta);
// }

// main();

//Usamos el método explain() para ver las estadisticas de la consulta. 
//El parametro que le tenemos que pasar es "executionStats", que me permite obtener el detalle de los tiempos de consulta. 

//edad: 384 en 17ms
//con indice me retorna en 6ms

//2) Manejo de Populations en MongoDB

const alumnoModel = require("./models/alumno.js");
const cursoModel = require("./models/curso.js");

const start = async() => {
    await mongoose.connect("mongodb+srv://coderhouse50015:coderhouse@cluster0.gbtlnu1.mongodb.net/Coderhouse?retryWrites=true&w=majority");

    //Buscamos un alumno y un curso para asociar: 
    // const cursoBackend = await cursoModel.findById("65ba576f6f6f6cb4369da9e9");

    // const estudiante = await alumnoModel.findById("65ba573f6f6f6cb4369da9e2")

    // console.log(cursoBackend);
    // console.log(estudiante);

    //Ingreso el curso al array cursos del estudiante: 
    //estudiante.cursos.push(cursoBackend);

    //Ahora actualizo el documento: 
    //await alumnoModel.findByIdAndUpdate(estudiante._id, estudiante);

    //Ahora si yo quiero ver por consola los cursos que tiene el alumno, puedo  hacerlo de la siguiente manera: 

    const estudianteConCursos = await alumnoModel.findById("65ba573f6f6f6cb4369da9e2");
    console.log(JSON.stringify(estudianteConCursos, null, 2))
}

start();

//Populate es una función de mongoose que nos permite relacionar documentos de diferentes colecciones. 