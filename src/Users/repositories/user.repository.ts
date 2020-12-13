import { RepositoryBase } from "../../App/abstracts/repository.base";
import {EntityRepository} from "typeorm";
import {User} from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User> {
  // 
}