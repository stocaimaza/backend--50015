class JugueteDTO {
    constructor(nombre, categoria, precio) {
        this.nombre = nombre; 
        this.categoria = categoria;
        this.fullname = `${nombre} ${categoria}`;
        //Concatenamos el nombre y la categoria para crear el fullname que el front no me esta enviando. 
        this.precio = precio;
    }
}

module.exports = JugueteDTO;