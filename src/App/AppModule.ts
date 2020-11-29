import { Module } from '@nestjs/common';
import { AppController } from './Controllers/AppController';
import { AppService } from './Services/AppService';
import { UsersModule } from '../Users/UsersModule';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
