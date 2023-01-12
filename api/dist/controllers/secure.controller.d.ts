import { UserProfile } from '@loopback/security';
import { User } from '../models';
import { Credentials, UserRepository } from '../repositories';
import { BcryptHasher } from '../services/hash.password';
import { JWTService } from '../services/jwt-service';
import { MyUserService } from '../services/user-service';
export declare class SecureController {
    userRepository: UserRepository;
    hasher: BcryptHasher;
    userService: MyUserService;
    jwtService: JWTService;
    constructor(userRepository: UserRepository, hasher: BcryptHasher, userService: MyUserService, jwtService: JWTService);
    signup(userData: Omit<User, 'id'>): Promise<{
        id?: string | undefined;
        name: string;
        email: string;
        telefone?: string | undefined;
        role?: string | undefined;
        device?: string | undefined;
    }>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    profile(currentUser: UserProfile): Promise<UserProfile>;
}
