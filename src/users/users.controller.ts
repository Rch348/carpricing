import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth') // 'auth' : cette string est un préfixe pour toutes les routes différentes définies dans cette classe.
export class UsersController {
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    // Nest validera le body de la requête entrante grâce au DTO (body doit être du type CreateUserDto)
    console.log(body);
  }
}
