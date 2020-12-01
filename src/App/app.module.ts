import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { UsersModule } from '../Users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './services/config.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig())
  ],
  controllers: [
    AppController
  ],
  providers: [
    // 
  ],
})

export class AppModule {  }
