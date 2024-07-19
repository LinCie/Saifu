import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, MikroORM } from '@mikro-orm/mongodb';
import User from '@/entities/User.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const user = new User(createUserDto.username, hash);
    await this.em.persistAndFlush(user);

    return user;
  }

  async findAll() {
    return await this.em.findAll(User);
  }

  async findOne(username: string) {
    return this.em.findOneOrFail(User, { username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.em.findOneOrFail(User, { id });

    this.em.assign(user, updateUserDto);
    await this.em.flush();

    return await this.em.findOne(User, { id });
  }

  async remove(id: string) {
    const user = await this.em.findOneOrFail(User, { id });
    await this.em.removeAndFlush(user);
    return;
  }
}
