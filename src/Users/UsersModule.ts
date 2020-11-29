import { Module } from '@nestjs/common';
import { UserController } from './Controllers/UserController';
import { UserService } from './Services/UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entities/User';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService]
})

export class UsersModule { }