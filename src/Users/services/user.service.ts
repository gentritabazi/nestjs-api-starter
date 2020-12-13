import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, getRepository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async getByEmail(email: string) {
    return await this.usersRepository
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

    // data.password = await this.hashPassword('password');

    const newUser = await this.usersRepository.save(data);

    return newUser;
  }

  async hashPassword(password) {
    const crypto = require('crypto');

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

    return hash;
  }
}
