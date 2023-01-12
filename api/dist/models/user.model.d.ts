import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id?: string;
    name: string;
    email: string;
    telefone?: string;
    password: string;
    role?: string;
    device?: string;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;
