import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola Comision 50015, feliz comienzo de semana!';
  }
}
