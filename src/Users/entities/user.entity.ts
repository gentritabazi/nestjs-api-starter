import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { EntityBase } from '../../App/abstracts/entity.base';

@Entity('users')
export class User extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({select: false})
  password: string;

  @Column({ type: 'enum', enum: ['active', 'inactive', 'block'], default: 'active' })
  status: string;
}