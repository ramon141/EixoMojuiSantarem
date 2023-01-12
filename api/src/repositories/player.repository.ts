import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CanaaEducacaoDataSourceDataSource} from '../datasources';
import {Player, PlayerRelations} from '../models';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {
  constructor(
    @inject('datasources.GameDataSource') dataSource: CanaaEducacaoDataSourceDataSource,
  ) {
    super(Player, dataSource);
  }
}
