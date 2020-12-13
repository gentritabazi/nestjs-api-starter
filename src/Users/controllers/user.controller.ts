import { Controller, Get, Post, Param, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from '../../Auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param() params) {
    return this.userService.getById(params.id);
  }

  @Post()
  async create(@Body() userData: CreateUserDto) {
    return {
      statusCode: HttpStatus.OK,
      user: await this.userService.create(userData),
    };
  }
}
