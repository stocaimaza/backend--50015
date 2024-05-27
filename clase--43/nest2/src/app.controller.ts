import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/firulais")
  firulais(): string {
    return "Hola soy firulais"
  }

  @Get("/conbarra")
  saludo(): string {
    return "Buen diaaaaaa"
  }

  @Get("sinbarra")
  saludito(): string {
    return "Saluditos, pero sin barra funciona igual"
  }

  //Con parametros: 
  //A) Me guardo el nombre de mi mascota
  // @Get("/mascota/:nombre")
  // getNombreMascota(@Param() params: any) {
  //   //Le pasamos el decorador Param y le decimos que el dato que esperamos puede ser de cualquier tipo (any)
  //   return `El nombre de mi mascota es: ${params.nombre}`
  // }

  //Otra forma de hacerlo. 
  @Get("mascota/:nombre")
  getNombreMascota(@Param("nombre") nombre: string) {
    return `El nombre de mi mascota es ${nombre}`
  }

  //Con Doble parametro: 
  @Get("dobleparametro/:nombre/:categoria")
  getDobleParametro(@Param() params: any) {
    return `El producto ${params.nombre} pertenece a la categoria ${params.categoria}`
  }

  //B) Recibiendo Querys
  @Get("info")
  getClienteInfo(@Query("nombre") nombre: string, @Query("apellido") apellido: string) {
    return `Nombre: ${nombre}, apellido: ${apellido}`
  }

  //C) Recibiendo un body
  @Post("mascota")
  createMascota(@Body() body: any): string {
    const {dueño, mascota} = body; 
    return `Se creo la mascota: ${mascota} que pertenece a ${dueño}`;
  }


}
