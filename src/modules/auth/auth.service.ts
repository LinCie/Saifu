import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(createUserDto.username);
    const isPasswordCorrect = await bcrypt.compare(
      createUserDto.password,
      user.hash,
    );

    if (isPasswordCorrect) {
      return user;
    }
    return null;
  }
}
