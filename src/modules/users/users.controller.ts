import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Version('1')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  @Version('1')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Patch(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
