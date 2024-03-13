//5) Listeners

//process.on() es un método que me permite registrar escuchadores de eventos (listeners), para los eventos que eventos que ocurran en el proceso. 

//Algunos de los eventos más utilizados: 

//on "exit": para ejecutar un código justo antes de la finalización del proceso. 

process.on("exit", () => {
    console.log("Este código se ejecutará justo antes de terminar el proceso ");
})

console.log("Pero si yo tengo texto adicional abajo, este se muestra antes del evento de cierre");

//Excepciones no controladas: on "uncaughtException"


process.on("exit", (code) => {
    console.log("Finalizamos con un error: ", code);
})

process.on("uncaughtException", (error) => {
    console.log("Tuvimos que capturar un error", error)
    //Te podes hacer un registro de los erroes que ocurrieron. 
    process.exitCode = 1;
})

firulais();





