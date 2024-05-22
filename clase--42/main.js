console.log("Hola mamá, ahora estoy en Typescript");
console.log("Olis, ke asen?");
//Trabajamos con tipos de datos: 
//String
var nombre = "Pepe";
var apellido = "Argento";
//Number
var nacimiento = 1960;
//Boolean
var trabaja = true;
//Undefined
var variableUndefined = undefined;
//Null
var datoNull = null;
//Objetos literales: 
var persona = {
    nombre: "Juan",
    edad: 30
};
var alumno = {
    nombre: "Coky",
    edad: 18
};
//Arrays: 
var numeros = [1, 2, 3, 4, 5];
var personitas = ["Juan", "Pablo", "Lucas"];
var combinadito = ["Ola", "ke", "ase", 100];
//Funciones: 
function suma(numeroA, numeroB) {
    return numeroA + numeroB;
}
console.log(suma(155, 5));
//Ejemplo con función flechiña
var restar = function (a, b) { return a - b; };
//Acá ya interpreta que el retorno será un number tambien. 
console.log(restar(100, 20));
//Clases: 
var Perro = /** @class */ (function () {
    function Perro(raza, edad) {
        this.raza = raza;
        this.edad = edad;
    }
    Perro.prototype.ladrar = function () {
        console.log("guau guau");
    };
    return Perro;
}());
//Instancia de la clase: 
var firulais = new Perro("ladrador", 5);
console.log(firulais);
firulais.ladrar();
