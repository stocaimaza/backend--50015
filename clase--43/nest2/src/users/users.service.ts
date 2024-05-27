import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//1) IMPORTAMOS
//Vamos a importar el Decorador @InjectModel
import { InjectModel } from '@nestjs/mongoose';
//Importamos el Model de Mongoose: 
import { Model } from 'mongoose';
//Import el User y el userSchema. 
import { User, UsersDocument, userSchema } from './schema/users.schema';

@Injectable()
export class UsersService {
  //2) Creamos el constructor: hacemos la inyección del nombre del modelo del usuario

  constructor(@InjectModel(User.name) private userModel: Model<UsersDocument>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
