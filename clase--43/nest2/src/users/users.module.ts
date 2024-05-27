import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
//Importamos MongooseModule: 
import { MongooseModule } from '@nestjs/mongoose';
//Importamos el User y el userSchema
import { User, userSchema } from './schema/users.schema';

//VARIABLES DE ENTORNO: me traigo el ConfigModule
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: userSchema
  }]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
