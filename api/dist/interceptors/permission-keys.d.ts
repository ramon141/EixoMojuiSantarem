import { AuthenticationMetadata } from '@loopback/authentication';
export declare const enum PermissionKeys {
    ADMIN = "Admin",
    MANAGER = "Controlador",
    EXECUTOR = "Executor",
    PLAYER = "Player"
}
export declare const MY_JWT_ADMIN: AuthenticationMetadata;
export declare const MY_JWT_PLAYER: AuthenticationMetadata;
export declare const MY_JWT_ALL: AuthenticationMetadata;
