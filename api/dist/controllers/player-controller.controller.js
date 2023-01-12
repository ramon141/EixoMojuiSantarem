"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerControllerController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PlayerControllerController = class PlayerControllerController {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async create(player) {
        return this.playerRepository.create(player);
    }
    async count(where) {
        return this.playerRepository.count(where);
    }
    async find(filter) {
        return this.playerRepository.find(filter);
    }
    async updateAll(player, where) {
        return this.playerRepository.updateAll(player, where);
    }
    async findById(id, filter) {
        return this.playerRepository.findById(id, filter);
    }
    async updateById(id, player) {
        await this.playerRepository.updateById(id, player);
    }
    async replaceById(id, player) {
        await this.playerRepository.replaceById(id, player);
    }
    async deleteById(id) {
        await this.playerRepository.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/players'),
    (0, rest_1.response)(200, {
        description: 'Player model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Player) } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Player, {
                    title: 'NewPlayer',
                    exclude: ['id'],
                }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PlayerControllerController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/players/count'),
    (0, rest_1.response)(200, {
        description: 'Player model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(models_1.Player)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PlayerControllerController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/players'),
    (0, rest_1.response)(200, {
        description: 'Array of Player model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Player, { includeRelations: true }),
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(models_1.Player)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PlayerControllerController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/players'),
    (0, rest_1.response)(200, {
        description: 'Player PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Player, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(models_1.Player)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [models_1.Player, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PlayerControllerController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/players/{id}'),
    (0, rest_1.response)(200, {
        description: 'Player model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Player, { includeRelations: true }),
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(models_1.Player, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PlayerControllerController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/players/{id}'),
    (0, rest_1.response)(204, {
        description: 'Player PATCH success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Player, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, models_1.Player]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PlayerControllerController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/players/{id}'),
    (0, rest_1.response)(204, {
        description: 'Player PUT success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, models_1.Player]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PlayerControllerController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/players/{id}'),
    (0, rest_1.response)(204, {
        description: 'Player DELETE success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PlayerControllerController.prototype, "deleteById", null);
PlayerControllerController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.PlayerRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.PlayerRepository])
], PlayerControllerController);
exports.PlayerControllerController = PlayerControllerController;
//# sourceMappingURL=player-controller.controller.js.map