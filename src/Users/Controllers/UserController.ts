import { Controller, Get, Post, HttpCode, Param, Put, Body, Delete } from '@nestjs/common';
import { UserService } from '../Services/UserService';
import { UpdateUserDto } from '../Dto/UpdateUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param() params) {
    // 
  }

  @Post()
  @HttpCode(201)
  create() {
    // 
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto ) {
    // 
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    // 
  }
}
