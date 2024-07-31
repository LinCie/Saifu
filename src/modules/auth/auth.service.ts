import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@/entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
    const payload = { sub: user.id, username: user.username };
    return {
      user,
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  refresh(user: User) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
