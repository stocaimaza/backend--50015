console.log("Hola mamá, ahora estoy en Typescript");

console.log("Olis, ke asen?");

//Trabajamos con tipos de datos: 

//String
let nombre: string = "Pepe"; 
let apellido: string = "Argento"; 

//Number

const nacimiento: number = 1960;

//Boolean

let trabaja: boolean = true; 

//Undefined
let variableUndefined: undefined = undefined; 

//Null
const datoNull: null = null; 

//Objetos literales: 

const persona: {nombre: string, edad: number} = {
    nombre: "Juan",
    edad: 30
}

//También yo puedo crear una INTERFACE a la hora de crear un objeto

interface Alumno {
    nombre: string, 
    edad: number
}

let alumno = {
    nombre: "Coky",
    edad: 18
}

//Arrays: 

const numeros: number[] = [1, 2, 3, 4, 5];

const personitas: string[] = ["Juan", "Pablo", "Lucas"]; 

const combinadito: (number | string)[] = ["Ola", "ke", "ase", 100];

//Funciones: 

function suma(numeroA: number, numeroB: number): number {
    return numeroA + numeroB;
}

console.log(suma(155,5));

//Ejemplo con función flechiña

const restar = (a: number, b: number) => a - b;
//Acá ya interpreta que el retorno será un number tambien. 

console.log(restar(100,20));

//Clases: 

class Perro {
    raza: string;
    edad: number
    constructor(raza: string, edad: number) {
        this.raza = raza;
        this.edad = edad; 
    }

    ladrar() {
        console.log("guau guau");
    }
}

//Instancia de la clase: 

const firulais = new Perro("ladrador", 5);
console.log(firulais);
firulais.ladrar();




