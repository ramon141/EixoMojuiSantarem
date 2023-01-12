import { DefaultCrudRepository } from '@loopback/repository';
import { CanaaEducacaoDataSourceDataSource } from '../datasources';
import { User, UserRelations } from '../models';
export declare type Credentials = {
    email: string;
    password: string;
};
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
    constructor(dataSource: CanaaEducacaoDataSourceDataSource);
}
