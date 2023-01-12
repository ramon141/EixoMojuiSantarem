import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Player } from '../models';
import { PlayerRepository } from '../repositories';
export declare class PlayerControllerController {
    playerRepository: PlayerRepository;
    constructor(playerRepository: PlayerRepository);
    create(player: Omit<Player, 'id'>): Promise<Player>;
    count(where?: Where<Player>): Promise<Count>;
    find(filter?: Filter<Player>): Promise<Player[]>;
    updateAll(player: Player, where?: Where<Player>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Player>): Promise<Player>;
    updateById(id: number, player: Player): Promise<void>;
    replaceById(id: number, player: Player): Promise<void>;
    deleteById(id: number): Promise<void>;
}
