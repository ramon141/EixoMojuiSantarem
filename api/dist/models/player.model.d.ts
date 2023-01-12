import { Entity } from '@loopback/repository';
export declare class Player extends Entity {
    id?: number;
    level: number;
    score: number;
    step: number;
    constructor(data?: Partial<Player>);
}
export interface PlayerRelations {
}
export declare type PlayerWithRelations = Player & PlayerRelations;
