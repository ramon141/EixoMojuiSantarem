import {authenticate} from '@loopback/authentication';
import {OPERATION_SECURITY_SPEC} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterBuilder,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {MY_JWT_ADMIN} from '../interceptors/permission-keys';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {BcryptHasher} from '../services/hash.password';

export class UserController {

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
  ) { }

  @authenticate(MY_JWT_ADMIN)
  @post('/admin/users')
  @response(200, {
    security: OPERATION_SECURITY_SPEC,
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser'
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    user.password = await this.hasher.hashPassword(user.password)
    return this.userRepository.create(user);
  }

  @authenticate(MY_JWT_ADMIN)
  @get('/admin/users/count')
  @response(200, {
    security: OPERATION_SECURITY_SPEC,
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @authenticate(MY_JWT_ADMIN)
  @get('/admin/users')
  @response(200, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    var filterWithoutPassword = new FilterBuilder<User>();
    if (filter) {
      filterWithoutPassword = new FilterBuilder(filter);
    }
    filterWithoutPassword.fields({password: false})
    return this.userRepository.find(filterWithoutPassword.build());
  }

  @authenticate(MY_JWT_ADMIN)
  @get('/admin/users/{id}')
  @response(200, {
    security: OPERATION_SECURITY_SPEC,
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    let user = await this.userRepository.findById(id, filter);
    user.password = "";
    return user;
  }

  @authenticate(MY_JWT_ADMIN)
  @put('/admin/users/{id}')
  @response(204, {
    security: OPERATION_SECURITY_SPEC,
    description: 'User user data',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    let userDb = await this.userRepository.findById(id);
    userDb.name = user.name
    userDb.role = user.role
    userDb.email = user.email
    userDb.telefone = user.telefone
    await this.userRepository.update(userDb);
  }

  @authenticate(MY_JWT_ADMIN)
  @put('/admin/users/{id}/password')
  @response(204, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Update user password',
  })
  async replacePasswordById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    let userDb = await this.userRepository.findById(id);
    userDb.password = await this.hasher.hashPassword(user.password)
    await this.userRepository.update(userDb);
  }

  @authenticate(MY_JWT_ADMIN)
  @del('/admin/users/{id}')
  @response(204, {
    security: OPERATION_SECURITY_SPEC,
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
