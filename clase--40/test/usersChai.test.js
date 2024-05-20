//Chai es una librería de assertions, la cual nos permitirá realizar comparaciones de test más claras. 

//Instalamos como dependencia de Desarrollo: npm install -D chai

import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js";
import chai from "chai";

const expect = chai.expect;

//Me conecto a mi Base de Datos. 
mongoose.connect("tubd");



describe("Testeamos el DAO de Usuarios", function () {
    before(function () {
        this.usersDao = new User(); 
    })

    beforeEach(async function () {
        await mongoose.connection.collections.users.drop();
    })
    
    it("El get de usuarios me debe retornar un array", async function() {
        const resultado = await this.usersDao.get();
        //assert.strictEqual(Array.isArray(resultado), true);
        expect(Array.isArray(resultado)).to.be.true;
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
        //assert.ok(resultado._id);
        expect(resultado).to.have.property("_id");
        //Acá verifico que el objeto de resultado tenga la propiedad "_id". 
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
        //assert.deepStrictEqual(resultado.pets, []);
        expect(resultado.pets).to.deep.equal([]);
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

        //assert.strictEqual(typeof user, "object");
        expect(user).to.be.an("object");
        //Verifica que el usuario es un objeto. 
    })

    after(async function() {
        await mongoose.disconnect(); 
    })

})