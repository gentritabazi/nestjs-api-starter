import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '../../App/abstracts/entity.base';

@Entity('users')
export class User extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'enum', enum: ['active', 'inactive', 'block'], default: 'active' })
  status: string;
}