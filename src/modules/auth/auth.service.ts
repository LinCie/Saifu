import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@/entities';

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

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.signIn(user);
  }

  async signIn(user: User) {
    return user.id;
  }
}
