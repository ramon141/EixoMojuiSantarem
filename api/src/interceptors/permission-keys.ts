import {AuthenticationMetadata} from '@loopback/authentication';

export const enum PermissionKeys {
  // normal authenticated user
  ADMIN = 'Admin',
  MANAGER = 'Controlador',
  EXECUTOR = 'Executor',
  PLAYER = "Player"
}


export const MY_JWT_ADMIN: AuthenticationMetadata = {
  strategy: "jwt", options: {
    required: PermissionKeys.ADMIN
  }
};

export const MY_JWT_PLAYER: AuthenticationMetadata = {
  strategy: "jwt", options: {
    required: PermissionKeys.PLAYER
  }
};

export const MY_JWT_ALL: AuthenticationMetadata = {
  strategy: "jwt"
};
