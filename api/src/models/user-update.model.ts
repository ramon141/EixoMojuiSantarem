import {Model, model, property} from '@loopback/repository';


@model()
export class UserUpdate extends Model {

  
  constructor(data?: Partial<UserUpdate>) {
    super(data);
  }
}

export interface UserUpdateRelations {
  // describe navigational properties here
}

export type UserUpdateWithRelations = UserUpdate & UserUpdateRelations;
