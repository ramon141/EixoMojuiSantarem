import {Entity, hasMany, model, property} from '@loopback/repository';


@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    index: {"unique": true}
  })
  email: string;

  @property({
    type: 'string',
    required: false,
  })
  telefone?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  role?: string;

  @property({
    type: 'string'
  })
  device?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
