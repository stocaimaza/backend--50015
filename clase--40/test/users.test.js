import mongoose from "mongoose";
import assert from "assert"; 
//Módulo nativo de Node JS que nos permite hacer las validaciones. 
import User from "../src/dao/Users.dao.js";

//Me conecto a mi Base de Datos. 
mongoose.connect("tubd");

//Describe: es una función que me permite agrupar un conjunto de pruebas relacionadas bajo un mismo bloque descriptivo. 

describe("Testeamos el DAO de Usuarios", function () {
    //Le asignamos un nombre o titulo
    //Pasamos una funcion callback que contiene todas las pruebas individuales. 

    //Esto se ejecuta una vez, antes de las pruebas. 
    before(function () {
        this.usersDao = new User(); 
    })

    //////////////////////////////////////////////////////////////////////////
    //Limpiamos la BD cada vez que testeamos: 
    beforeEach(async function () {
        await mongoose.connection.collections.users.drop();
        //this.timeout(5000);
    })
    //Acá le estamos pidiendo que borre la collections "users". 
    //Además le da un tiempo máximo para completar la operacion en 5 segundos. 
    //////////////////////////////////////////////////////////////////////////
    

    //Intentamos que nos retorne todos los usuarios. 
    //En el "it" describimos  lo que se espera del test. 
    it("El get de usuarios me debe retornar un array", async function() {
        const resultado = await this.usersDao.get();
        assert.strictEqual(Array.isArray(resultado), true);
        //Array.isArray(resultado) me retorna true si el dato pasado es un array. 
        //assert.strictEqual compara los valores "===". 
    })

    //Test 1: 
    it("El DAO debe poder agregar un usuario nuevo a la Base de datos", async function() {
        let usuario = {
            first_name: "Mirtha",
            last_name: "Legrand", 
            email: "lachiqui@legrand.com",
            password: "1234"
        }

        const resultado = await this.usersDao.save(usuario);
        assert.ok(resultado._id);
        //Acá verificamos que el valor que recibimos es "verdadero". 

    })

    //Test 2: 
    it("Validamos que el usuario tenga un array de mascotas vacio", async function() {
        let usuario = {
            first_name: "Mirtha",
            last_name: "Legrand", 
            email: "lachiqui@legrand.com",
            password: "1234"
        }

        const resultado = await this.usersDao.save(usuario); 
        assert.deepStrictEqual(resultado.pets, []);
    })

    //Test 3: 
    it("El DAO puede obtener un usuario por email", async function() {
        let usuario = {
            first_name: "Mirtha",
            last_name: "Legrand", 
            email: "lachiqui@legrand.com",
            password: "1234"
        }
        await this.usersDao.save(usuario); 

        const user = await this.usersDao.getBy({email: usuario.email}); 

        assert.strictEqual(typeof user, "object");
    })

    after(async function() {
        await mongoose.disconnect(); 
    })

})