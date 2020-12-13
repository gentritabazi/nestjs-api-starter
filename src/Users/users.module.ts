import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriber } from './subscribers/user.subscriber';
import { UserRepository } from './repositories/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [UserService, UserSubscriber],
    exports: [UserService],
})

export class UsersModule { }