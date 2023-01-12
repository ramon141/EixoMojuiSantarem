import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {User} from './models';
import {Credentials} from './repositories/user.repository';
import {PasswordHasher} from './services/hash.password';
/* import {MinioService} from './services/minio-service';
import {SpacesService} from './services/spaces-service'; */

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = '138asda8213';
  export const TOKEN_EXPIRES_IN_VALUE = '7h';
}
export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expiresIn',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.jwt.service',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.rounds');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<Credentials, User>>(
    'services.user.service',
  );
}

/* export namespace MinioServiceBindings {
  export const MINIO_SERVICE = BindingKey.create<MinioService>(
    'services.minio.service',
  );
}

export namespace SpacesServiceBindings {
  export const SPACES_SERVICE = BindingKey.create<SpacesService>(
    'services.spaces.service',
  );
}
 */