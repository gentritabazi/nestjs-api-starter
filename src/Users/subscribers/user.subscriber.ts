import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  /**
   * Called before user insertion.
   */
  async beforeInsert(event: InsertEvent<User>) {
    event.entity.password = await this.hashPassword(event.entity.password);
  }

  /**
   * Hash password.
   */
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}