import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//Importamos: 
import { MongooseModule } from '@nestjs/mongoose';
//Nos traemos el userModule: 
import { UsersModule } from './users/users.module';

//MiMiddleware: 
//1) Importamos: NestModule, MiddlewareConsumer y MiMiddleware
import MiMiddleware from './middleware/miMiddleware';

//Variables de Entorno: 
//Instalamos: npm install @nestjs/config
//Importamos ConfigModule, ConfigService
import { ConfigModule, ConfigService } from '@nestjs/config';

//1) Modificamos los imports



@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async(config:ConfigService) => ({
      uri: config.get<string>("MONGO_URL")
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiMiddleware).forRoutes({path: "*", method: RequestMethod.ALL});
  }
}


//mongodb+srv://coderhouse50015:<password>@cluster0.gbtlnu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//CONECTAMOS MONGOOSE A NUESTRA APLICACION
//1) Importamos MongooseModule, y utilizamos el método "forRoot" que nos permitirá establecer la conexion desde el inicio de la aplicación. 