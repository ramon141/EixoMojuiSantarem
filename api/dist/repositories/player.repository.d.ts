import { DefaultCrudRepository } from '@loopback/repository';
import { CanaaEducacaoDataSourceDataSource } from '../datasources';
import { Player, PlayerRelations } from '../models';
export declare class PlayerRepository extends DefaultCrudRepository<Player, typeof Player.prototype.id, PlayerRelations> {
    constructor(dataSource: CanaaEducacaoDataSourceDataSource);
}
