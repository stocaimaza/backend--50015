const fs = require("fs");

class FileSystemJugueteDAO {
    async crearJuguete(datosJuguete) {
        try {
            const juguetes = await this.leerArchivo(); 
            //Leemos el archivo.

            juguetes.push(datosJuguete);
            //Agregamos el nuevo juguete. 

            await this.escribirArchivo(juguetes);
            return datosJuguete;
        } catch (error) {
            throw new Error("Error al crear el juguete en el sistema de archivos");
        }
    }


    async obtenerJuguetes() {
        try {
            const juguetes = await this.leerArchivo()
            //Leemos el archivo y recuperamos los datos. 
            
            return juguetes;
        } catch (error) {
            throw new Error("Error al obtener los juguetes del sistema de archivos");
        }
    }

    //Métodos auxiliares: 

    async leerArchivo() {
        try {
            const data = await fs.promises.readFile("./src/juguetes.json");
            return JSON.parse(data);
        } catch (error) {
            throw new Error("Error al leer el sistema de archivos");
        }
    }

    async escribirArchivo(data) {
        try {
            await fs.promises.writeFile("./src/juguetes.json", JSON.stringify(data, null, 2));
        } catch (error) {
            throw new Error("Error al escribir el sistema de archivos");
        }
    }
}

module.exports = FileSystemJugueteDAO;