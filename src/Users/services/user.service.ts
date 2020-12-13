import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { getRepository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository
  ) { }

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  getById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async getByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  async create(data: CreateUserDto): Promise<User> {
    const qb = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: data.email });

    const user = await qb.getOne();

    if (user) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        errors: ['Email must be unique.'],
        error: 'Bad Request'
      }, HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.save(data);

    return newUser;
  }
}
