import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, getJsonSchemaRef, getModelSchemaRef, HttpErrors, post, requestBody} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import * as _ from 'lodash';
import {PermissionKeys} from '../interceptors/permission-keys';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {validateCredentials} from '../services';
import {BcryptHasher} from '../services/hash.password';
import {JWTService} from '../services/jwt-service';
import {MyUserService} from '../services/user-service';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';


export class SecureController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,

    // @inject('service.user.service')
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,

    // @inject('service.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

  ) { }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      }
    }
  })
  async signup(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {
          title: 'NewUser',
          exclude: ['id', "role"],
        }),
      },
    },
  })
  userData: Omit<User, 'id'>) {
    validateCredentials(_.pick(userData, ['name', 'email', 'password']));
    const existUser = await this.userRepository.findOne({where: {email: userData.email.trim()}});
    if (existUser) {
      throw new HttpErrors.UnprocessableEntity('já existe usuário com esse login');
    }
    userData.role = PermissionKeys.PLAYER;
    userData.email = userData.email.trim();
    userData.password = await this.hasher.hashPassword(userData.password);
    const {password, ...savedUser} = await this.userRepository.create(userData);
    return savedUser;
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials,
  ): Promise<{token: string}> {
    // make sure user exist,password should be valid
    const user = await this.userService.verifyCredentials(credentials);
    // console.log(user);
    const userProfile = await this.userService.convertToUserProfile(user);
    // console.log(userProfile);

    const token = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({token: token})
  }


  @authenticate("jwt")
  @get('/profile', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: getJsonSchemaRef(User),
          },
        },
      },
    },
  })
  async profile(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    return Promise.resolve(currentUser);
  }
}


