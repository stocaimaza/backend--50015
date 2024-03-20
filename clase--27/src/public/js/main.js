const formularioProductos = document.getElementById("formularioProductos");

formularioProductos.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    //Me guardo los datos del formulario: 
    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;

    const data = {
        nombre: nombre, 
        categoria: categoria,
        precio: precio
    }

    const response = await fetch("/productos", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    if(!response.ok) {
        alert("Tenemos un error, tendras una mala noticia hoy");
    }

    //Limpiamos el formulario: 
    formularioProductos.reset();
})