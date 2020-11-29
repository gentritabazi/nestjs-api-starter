import { Module } from '@nestjs/common';
import { AppController } from './Controllers/AppController';
import { AppService } from './Services/AppService';
import { UsersModule } from '../Users/UsersModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Users/Entities/User';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({  }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})

export class AppModule { }
