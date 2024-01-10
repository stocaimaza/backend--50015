console.log("Siii funcionooooo!!");

const socket = io(); 

socket.emit("mensaje", "Hola mundo!");

//Recibimos el saludito del servidor: 

socket.on("saludito", (data) => {
    console.log(data);
})