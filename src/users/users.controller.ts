import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth') // 'auth' : cette string est un préfixe pour toutes les routes différentes définies dans cette classe.
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  // Nest validera le body de la requête entrante grâce au DTO (body doit être du type CreateUserDto).
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  // @UseInterceptors(ClassSerializerInterceptor) // Pas nécessaire avec un intercepteur personnalisé.
  // @UseInterceptors(SerializeInteceptor) // Si la classe SerializeInterceptor n'est pas instanciable.
  // @UseInterceptors(new SerializeInteceptor(UserDto)) // Lourd avec 3 imports > cf. @Serialize(UserDto) au dessus de la classe.
  @Get('/:id')
  // @Param extrait des infos (passés en argument) de la requête entrante.
  async findUser(@Param('id') id: string) {
    console.log('handler is running.');
    // L'id provenant d'une requête est toujours de type string car toute partie de l'url est une string.
    const user = await this.usersService.findOne(parseInt(id));
    // findOne() est géré dans le contrôleur mais update() et remove() le sont dans le service au cas où un hook est utilisé pour capturer l'erreur ou retourner null si pas d'update ou delete.
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
