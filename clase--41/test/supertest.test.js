//Testing de integración: analizará toda nuestra App en su conjunto. 
//Testing funcional: este evalua el comportamiento completo del sistema pero desde la vision del usuario. 

//Importamos supertest:
import supertest from "supertest"; 

//Importamos chai, recuerden que es un librería de aserciones para node js. 
import chai from "chai";

const expect = chai.expect;

//Vamos a crear la constante "requester", quien se encargará de realizar las peticiones al servidor. 

const requester = supertest("http://localhost:8080"); 

describe("Testing de la App Web Adoptame", () => {
    //1) Mascotas: 

    describe("Testing de mascotas: ", () => {
        it("Endpoint POST /api/pets que debe crear una mascota nueva", async () => {

            //Voy a crear un mock para una mascota: 

            const pichichoMock = {
                name: "Firulais",
                specie: "Pichicho", 
                birthDate: "2021-01-01"
            }

            const {statusCode, ok, _body} = await requester.post("/api/pets").send(pichichoMock);

            console.log(statusCode);
            console.log(ok);
            console.log(_body);

            //Podemos evaluar si el payload tiene una propiedad id, si lo tiene se pudo crear correctamente el documento de Firulais. 
            expect(_body.payload).to.have.property("_id"); 

        })

        //Actividad en clase: 
        //1) Verificamos que el adopted sea false: 

        it("Validamos que adopted sea false, al crear una mascota", async () => {

            const nuevaMascota = {
                name: "Fatiga", 
                specie: "Perruno", 
                birthDate: "2023-05-20"
            }

            const { statusCode, _body} = await requester.post("/api/pets").send(nuevaMascota);

            expect(statusCode).to.eql(200);
            expect(_body.payload).to.have.property("adopted").that.eql(false);
            //Verificamos que se crea correctamente la mascota y que la propiedad "adopted" esta en false    
        })

        //2) Si se crea mascota sin el campo nombre, se debe retornar status 400:

        it("Si se crea mascota sin el campo nombre, se debe retornar status 400", async () => {
            const mascotaSinNombre = {
                specie: "Gatito",
                birthDate: "2020-05-10"
            }

            const { statusCode } = await requester.post("/api/pets").send(mascotaSinNombre);

            expect(statusCode).to.eql(400);

        })

        //3) Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo.

        it("Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo.", async () => {

            const {statusCode, _body} = await requester.get("/api/pets");

            //Evaluamos: 

            expect(statusCode).to.eql(200);
            expect(_body.payload).that.is.an("array");

        })
    })

    //Test avanzados: 
    describe("Test Avanzado", () => {
        //Me voy a crear una variable global para el test para almacenar el valor de la cookie: 
        let cookie; 

        //1) Registro de usuarios:  
        it("Debe registrar correctamente a un usuario", async () => {
            const mockUsuario = {
                first_name: "Pepe", 
                last_name: "Argento",
                email: "pepe@garmendiazapatos.com", 
                password: "1234"
            }

            const {_body} = await requester.post("/api/sessions/register").send(mockUsuario);

            //Validamos que tenemos payload: 
            expect(_body.payload).to.be.ok;
        })
        //2) Login del usuario
        it("Se debe loguear el usuario y recuperar la cookie", async () => {

            //enviamos el login con los datos creados en el paso anterior: 
            const mockLogin = {
                email: "pepe@garmendiazapatos.com",
                password: "1234"
            }

            const resultado = await requester.post("/api/sessions/login").send(mockLogin);

            //Se obtiene la cookie de la sesion y se guarda en una variable: 
            const cookieResultado = resultado.headers['set-cookie']['0'];

            //Verificamos que la cookie recuperada exista
            expect(cookieResultado).to.be.ok;

            //Separo clave y valor y me lo guardo en mi variable global: 

            cookie = {
                name: cookieResultado.split("=")['0'],
                value: cookieResultado.split("=")['1']
            }

            //Chequeamos que el nombre de la cookie que recuperamos sea igual a la de mi app: 
            expect(cookie.name).to.be.ok.and.eql("coderCookie");
            expect(cookie.value).to.be.ok;

        })
        //3) Probamos la ruta current:
        it("Debe enviar la cookie que contiene el usuario", async () => {
            
            //Enviamos la cookie que nos guardamos previamente: 
            
            const {_body} = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`]);

            //Verificamos que tenga el mail de mi usuario: 

            expect(_body.payload.email).to.be.eql("pepe@garmendiazapatos.com");

        })
    })

    //TESTING CON CARGA DE IMAGENES: 

    describe("Testeamos la carga de imagenes", () => {
        it("Tenemos que crear una mascota con una imagen", async () => {

            const coderGato = {
                name: "CoderGato",
                specie: "gatito", 
                birthDate: "2021-06-01"
            }

            const resultado = await requester.post("/api/pets/withimage")
                .field("name", coderGato.name)
                .field("specie", coderGato.specie)
                .field("birthDate", coderGato.birthDate)
                .attach("image", "./test/codergato.jpg");

            //Verificamos que la peticion resulto ok
            expect(resultado.status).to.be.eql(200);

            //Verificamos que la mascota tenga el campo "image". 
            expect(resultado._body.payload.image).to.be.ok;
        })
    })

})
