const generarInfoError = (usuario) => {
    return ` Los datos estan incompletos o no son válidos. 
    Necesitamos recibir los siguientes datos: 
    - Nombre: String, peero recibimos ${usuario.nombre}
    - Apellido: String, peeero recibimos ${usuario.apellido}
    - Email: String, recibimos ${usuario.email}
    `
}

module.exports = {
    generarInfoError
}