import { Controller, Get, Post, HttpCode, Param, Put, Body, Delete, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getAll() {
    return this.userService.getAll()
  }

  @Get(':id')
  getById(@Param() params) {
    return this.userService.getById(params.id)
  }
}
