import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { BcryptHasher } from '../services/hash.password';
export declare class UserController {
    userRepository: UserRepository;
    hasher: BcryptHasher;
    constructor(userRepository: UserRepository, hasher: BcryptHasher);
    create(user: Omit<User, 'id'>): Promise<User>;
    count(where?: Where<User>): Promise<Count>;
    find(filter?: Filter<User>): Promise<User[]>;
    findById(id: string, filter?: FilterExcludingWhere<User>): Promise<User>;
    replaceById(id: string, user: User): Promise<void>;
    replacePasswordById(id: string, user: User): Promise<void>;
    deleteById(id: string): Promise<void>;
}
